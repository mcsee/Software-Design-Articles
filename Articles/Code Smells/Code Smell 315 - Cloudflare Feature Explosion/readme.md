# Code Smell 315 - Cloudflare Feature Explosion

![Code Smell 315 - Cloudflare Feature Explosion](Code%20Smell%20315%20-%20Cloudflare%20Feature%20Explosion.png)

*When bad configuration kills all internet proxies*

> TL;DR: Overly large auto-generated config can crash your system.

# Problems 😔

- Config overload
- [Hardcoded](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md) limit
- Lack of validations
- Crash on overflow
- Fragile [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Cascading Failures
- [Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)
- Silent duplication
- Unexpected crashes
- Thread panics in critical paths
- Treating internal data as trusted input
- Poor observability
- Single point of failure in internet infrastructure

# Solutions 😃

1. Validate inputs early
2. Enforce soft limits
3. Fail-fast on parse
4. Monitor config diffs
5. Version config safely
6. Use backpressure mechanisms
7. Degrade functionality gracefully
8. Log and continue
9. Improve degradation metrics
10. Implement proper Result/Option handling with fallbacks
11. Treat all configuration as untrusted input

# Refactorings ⚙️

[Refactoring 004 - Remove Unhandled Exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions/readme.md)

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

[Refactoring 035 - Separate Exception Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20035%20-%20Separate%20Exception%20Types/readme.md)

# Context 💬

In the early hours of November 18, 2025, Cloudflare’s global network began failing to deliver core HTTP traffic, generating a [flood of 5xx errors](https://mgx.dev/blog/cloudflare1119) to end users.

This was not caused by an external attack or security problem.

The outage stemmed from an internal "latent defect" triggered by a [routine configuration change](https://techcrunch.com/2025/11/18/cloudflare-blames-massive-internet-outage-on-latent-bug/)

The failure fluctuated over time, until a fix was fully deployed.

The root cause lay in a software bug in Cloudflare’s Bot Management module and its downstream proxy logic.

The Technical Chain of Events

1. **Database Change (11:05 UTC)**: A ClickHouse permissions update made previously implicit table access explicit, allowing users to see metadata from both the `default` and `r0` databases.

2. **SQL Query Assumption**: A Bot Management query lacked a database name filter:
   ```sql
   SELECT name, type FROM system.columns
   WHERE table = 'http_requests_features'
   ORDER BY name;
   ```
   This query began returning duplicate rows—once for `default` database, once for `r0` database.

3. **Feature File Explosion**: The machine learning feature file doubled from ~60 features to over 200 features with duplicate entries.

4. **Hard Limit Exceeded**: The Bot Management module had a hard-coded limit of 200 features (for memory pre-allocation), which was now exceeded.

5. **The Fatal [.unwrap()](https://doc.rust-lang.org/std/?search=unwrap)**: The Rust code called `.unwrap()` on a Result that was now returning an error, causing the thread to panic with "called Result::unwrap() on an Err value". *see code below*

6. **Global Cascade**: This panic propagated across all 330+ data centers globally, bringing down core CDN services, Workers KV, Cloudflare Access, Turnstile, and the dashboard.

The estimated financial impact across affected businesses ranges from $180-360 million.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/a2c931e606e42297a1933dc092cf0f87) -->

```rust
let features: Vec<Feature> = load_features_from_db();
let max = 200;
assert!(features.len() <= max);
# This magic number assumption 
# is actually wrong                              
                              
for f in features {
    proxy.add_bot_feature(f.unwrap());
    # You also call unwrap() on every feature. 
    # If the database returns an invalid entry 
    # or a parsing error,
    # you trigger another panic. 
    # You give your runtime no chance to recover. 
    # You force a crash on a single bad element.
}
                              
# A quiet config expansion turns into
# a full service outage 
# because you trust input that you should validate 
# and you use failure primitives (assert!, unwrap()) 
# that kills your program 
# instead of guiding it to safety
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7d729029618f1088697f9fec70a8ba43) -->

```rust
fn load_and_validate(max: usize) -> Result<Vec<Feature>, String> {
    let raw: Vec<Result<Feature, Error>> = load_features_from_db();
    
    if raw.len() > max {
        return Err(format!(
            "too many features: {} > {}", 
            raw.len(), max
        ));
    }
    
    Ok(raw.into_iter()
        .filter_map(|r| r.ok())
        .collect())
}
```

# Detection 🔍

You can detect this code smell by searching your codebase for specific keywords:

- `.unwrap()` - Any direct call to this method
- `.expect()` - Similarly dangerous
- `panic!()` - Explicit panics in non-test code
- `thread::panic_any()` - Panic without context

When you find these patterns, ask yourself: "What happens to my system when this Result contains an Err?" If your honest answer is "the thread crashes and the request fails," then you've found the smell.

You can also use automated linters. Most Rust style guides recommend tools like `clippy`, which flags `unwrap()` usage in production code paths. 

When you configure `clippy` with the `#![deny(unwrap_in_result)]` attribute, you prevent new `unwrap()` calls from entering your codebase.

# Tags 🏷️

- Fail-Fast

# Level 🔋

[x] Advanced

# Why the Bijection Is Important 🗺️

Your internal config generator must map exactly what your code expects. 

A mismatched config (e.g., duplicated metadata) breaks the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between what your config represents and what your proxy code handles. 

When you assume "this file will always have ≤200 entries", you break that [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Reality sends 400 entries → your model explodes → the real world wins, your service loses.

That mismatch causes subtle failures that cascade, especially when you ignore validation or size constraints.

Ensuring a clean [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) between the config source and code input helps prevent crashes and unpredictable behavior.

# AI Generation 🤖

AI generators often prioritize **correct** logic over **resilient** logic. 

If you ask an AI to "ensure the list is never larger than 200 items," it might generate an assertion or a panic because that is the most direct way to satisfy the requirement, introducing this smell.

The irony: Memory-safe languages like Rust prevent undefined behavior and memory corruption, but they can't prevent logic errors, poor error handling, or architectural assumptions. 

**Memory safety ≠ System safety.**

# AI Detection 🧲

AI can easily detect this if you instruct it to look for availability risks. 

You can use linters combined with AI to flag panic calls in production code.

Human review on critical functions is more important than ever.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove all .unwrap() and .expect() calls. Return Result instead and validate the vector bounds explicitly

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+all+.unwrap%28%29+and+.expect%28%29+calls.+Return+Result+instead+and+validate+the+vector+bounds+explicitly%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+all+.unwrap%28%29+and+.expect%28%29+calls.+Return+Result+instead+and+validate+the+vector+bounds+explicitly%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+all+.unwrap%28%29+and+.expect%28%29+calls.+Return+Result+instead+and+validate+the+vector+bounds+explicitly%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+all+.unwrap%28%29+and+.expect%28%29+calls.+Return+Result+instead+and+validate+the+vector+bounds+explicitly%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) | [You](https://you.com/search?q=remove+all+.unwrap%28%29+and+.expect%28%29+calls.+Return+Result+instead+and+validate+the+vector+bounds+explicitly%3A+%60%60%60rust%0D%0Alet+features%3A+Vec%3CFeature%3E+%3D+load_features_from_db%28%29%3B%0D%0Alet+max+%3D+200%3B%0D%0Aassert%21%28features.len%28%29+%3C%3D+max%29%3B%0D%0A%23+This+magic+number+assumption+%0D%0A%23+is+actually+wrong++++++++++++++++++++++++++++++%0D%0A++++++++++++++++++++++++++++++%0D%0Afor+f+in+features+%7B%0D%0A++++proxy.add_bot_feature%28f.unwrap%28%29%29%3B%0D%0A++++%23+You+also+call+unwrap%28%29+on+every+feature.+%0D%0A++++%23+If+the+database+returns+an+invalid+entry+%0D%0A++++%23+or+a+parsing+error%2C%0D%0A++++%23+you+trigger+another+panic.+%0D%0A++++%23+You+give+your+runtime+no+chance+to+recover.+%0D%0A++++%23+You+force+a+crash+on+a+single+bad+element.%0D%0A%7D%0D%0A++++++++++++++++++++++++++++++%0D%0A%23+A+quiet+config+expansion+turns+into%0D%0A%23+a+full+service+outage+%0D%0A%23+because+you+trust+input+that+you+should+validate+%0D%0A%23+and+you+use+failure+primitives+%28assert%21%2C+unwrap%28%29%29+%0D%0A%23+that+kills+your+program+%0D%0A%23+instead+of+guiding+it+to+safety%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Auto-generated config can hide duplication or grow unexpectedly.

If your code assumes size limits or blindly trusts its input, you risk a catastrophic crash.

Validating inputs is good; crashing because an input is slightly off is a disproportionate response that turns a minor defect into a global outage.

Validate config, enforce limits, handle failures, and avoid assumptions.

That’s how you keep your system stable and fault-tolerant.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)
 
[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

# More Information 📕

[Cloudflare Blog](https://techcrunch.com/2025/11/18/cloudflare-blames-massive-internet-outage-on-latent-bug/)

[Cloudflare Status](https://www.cloudflarestatus.com/incidents/8hfw6ywc57vp)

[TechCrunch Coverage](https://techcrunch.com/2025/11/18/cloudflare-blames-massive-internet-outage-on-latent-bug/)

[MGX Deep Technical Analysis](https://mgx.dev/blog/cloudflare1119)

[Hackaday: How One Uncaught Rust Exception Took Out Cloudflare](https://hackaday.com/2025/11/20/how-one-uncaught-rust-exception-took-out-cloudflare/)

[The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/the-pulse-cloudflare-takes-down-half)

[CNBC: Financial Impact Analysis](https://www.cnbc.com/2025/11/18/cloudflare-outage-briefly-takes-chatgpt-claude-services-offline.html)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
 
* * *

> A good programmer is someone who always looks both ways before crossing a one-way street

_Douglas Crockford_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)