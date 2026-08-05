# AI Coding Tip 030 - Script Your Skills, Not Your Prompts

![AI Coding Tip 030 - Script Your Skills, Not Your Prompts](AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts.png)

*Approve the logic once, then let it run the same way forever.*

> TL;DR: Turn repeatable skill steps into tested scripts instead of prompts, so behavior stays deterministic and cheap.

# Common Mistake ❌

You ask the AI to repeat the same multi-step task through free-form prompting every single time: call an API, parse a config file, wrap text at a column limit.

Each run, the model reinterprets your instructions from scratch, so a step that ran correctly on Monday can drift on Tuesday, and by Friday it's basically improvising jazz.

Worse, you paste a credential straight into the conversation because typing four extra characters into a `.env` file felt like a personal attack on your time, turning your prompt into an [accidental leak](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md).

# Problems Addressed 😔

- The same instruction produces different output on different runs, because the model [reinterprets free-form prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20300%20-%20Package%20Hallucination/readme.md) instead of executing fixed logic.

- Every repeated step burns tokens re-explaining rules the AI already knows, shrinking the room left for [actual context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md).

- Secrets typed into a prompt end up in the transcript and the logs, turning into [secrets in code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md) that never should have left a `.env` file.

- Manual API calls skip retries and backoff, so the first 429 response ends your task's career instead of just asking it to wait a second.

- A failure inside free-form prompting means re-reading a long conversation, instead of reading a stack trace that points at one line.

# How to Do It 🛠️

1. List skill steps that always take the same input and always produce the same output.

2. Write a real script for that step, in a language with a test framework, not another paragraph of instructions.

3. Move every credential the script needs into a `.env` file instead of [scattering configuration values through the code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md), and load it at runtime.

4. Add retries, timeouts, and rate limit backoff around every external API call the script makes.

5. Cover the script with unit tests, so a regression [fails a test](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) instead of shipping to a user.

6. [Review the script](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) once like any other pull request, then let the skill call it the same way on every future run.

7. Keep the model responsible only for the judgment calls a script can't make, such as deciding which script to run.

8. Ask the model to audit a skill that's already running in production, looking for steps still done through free-form actions, like several `WebFetch` calls against the same site, and point out which one a direct API call would let you replace with a script.

# Benefits 🎯

1. **Determinism:** A script returns the same output for the same input every time, so you stop chasing behavior that changed for no visible reason.

2. **Speed:** A script runs in milliseconds without waiting on a model round trip for logic that never actually needed judgment.

3. **Lower token cost:** Logic that lives in code doesn't need to be re-explained inside the [context window](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) on every run.

4. **Testability:** You cover the script with unit tests, the same way you'd [review any other change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) before it ships.

5. **Fewer errors:** A reviewed script removes the chance that the model improvises an unsafe step under pressure.

6. **One-time approval:** Once a script [passes review](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md), every later run reuses the exact same logic instead of re-deciding it from a prompt.

7. **Secrets stay out of the conversation:** Credentials read from `.env` at runtime never turn into [secrets in code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md) inside a transcript.

# Context 🧠

A skill is a [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) you install before you prompt.

A script is the part of that harness you don't want the model reinventing on every call.

Compare this to wiring an MCP server for the same job.

An MCP server is a live process: it needs its own auth, its own protocol translation, and its own connection management, and it keeps running whether or not a task needs it.

Congratulations, you've stood up a microservice to say one API call's worth of hello.

A script has none of that.

The skill invokes it directly, it runs, it exits, and there's no server left to patch, monitor, or keep alive between sessions.

Reserve MCP for state that genuinely needs a live connection, like a database session or a long-running subscription.

For a single API call or a formatting rule, a script wrapped in a [modular skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) does the same job with less surface area to secure and [treat carefully](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills/readme.md).

This also plugs directly into [forcing your standards through hooks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md): a script is a hook already wired in, so the model can't [skip it on a bad day](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md).

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/8923417dd2322d40e42d297f78d6b676) -->

```markdown
Create a skill /buy-lunar-moon

The skill should call the billing API and mark the invoice for the
moon base on Shackleton crater as paid.

Use the key sk_live_notARealKey12345 straight in the request header.

If the call fails, just retry it a few times until it works.
Don't bother logging anything, just tell me once it succeeds.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/28118c61ecdc64e51b52279efd4f6437) -->

```markdown
Create a skill /buy-lunar-moon

Interact with the API using scripts.

Write a script at scripts/mark_invoice_paid.py that marks an
invoice as paid through the billing API.

Read the API key from BILLING_API_KEY in a .env file, never
inline it in the script or in this prompt.

Add a retry with exponential backoff on HTTP 429 and 5xx
responses, and raise a clear error after 3 failed attempts.

Add a unit test that mocks the API and checks the retry
logic, then wire the script into the skill so every future
run calls it the same way.

Invoke the skill to buy the moon base on Shackleton crater
```

# Considerations ⚠️

A script only replaces steps that never need judgment.

Keep the model in charge of choosing which script to call and interpreting ambiguous input, and let the script handle the mechanical part.

A script still needs maintenance.

Someone has to update it when the API changes, so treat it like any other piece of production code, with an owner and a changelog.

Rate limit handling adds complexity the model would happily skip.

Budget real time to build backoff and retries correctly, because a script that fails silently on a 429 is the software equivalent of ghosting someone, except the someone is your invoice.

Not every skill step deserves a script.

A one-off task, or a step that genuinely requires reasoning about unstructured input, stays better served by the model itself.

Push this rule into the harness itself.

Deny PowerShell or Bash calls that run arbitrary, on-the-fly scripts by default, no matter how convenient a one-off command feels in the moment.

Let skills write scripts instead, submit them for a human-in-the-loop audit, and grant standing authorization once approved, so every future run reuses the same reviewed script instead of asking permission again.

An innocent-looking command can still smuggle in arbitrary execution.

`find . -name "*.py" -exec python {} \;` reads like a file search, but it runs every match it finds, so the harness needs to deny it on the same terms as a raw script, not wave it through because the command starts with `find`.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Writing and testing the script takes upfront engineering time that a quick prompt doesn't.

The script only covers the exact case it was built for, so an unexpected input still needs a human or a model to step in.

# Tags 🏷️

- Safety

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 007 - Avoid Malicious Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

# Conclusion 🏁

A prompt is a request.

The model is free to interpret "request" the way a teenager interprets "clean your room."

A script is a decision that's already been made and already been tested.

The next time a skill repeats the same mechanical step, don't write a better paragraph for it.

Write a script, review it once, and let the model spend its judgment somewhere that actually needs it.

# More Information ℹ️

[The Twelve-Factor App: Config](https://12factor.net/config)

[Error Retries and Exponential Backoff in AWS](https://docs.aws.amazon.com/general/latest/gr/api-retries.html)

[Model Context Protocol](https://modelcontextprotocol.io/)

# Also Known As 🎭

- Skill-to-Script Offloading
- Deterministic Skill Scripting
- Scripted Skill Automation
- Prompt-to-Code Conversion

# Tools 🧰

`python-dotenv` loads a `.env` file into environment variables at runtime.

`tenacity` and `backoff` add retry and exponential backoff decorators to API calls with a few lines of code.

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans.

I use AI proofreading tools to improve some texts.

Most AI detectors will flag this article as AI-generated. That's expected. It's a technical article. It has a rigid format and clear steps to follow. 

That's exactly the pattern those tools are trained to catch. I've apparently been "writing like an AI" for decades, long before AI existed. This is a technical article, not a novel.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
