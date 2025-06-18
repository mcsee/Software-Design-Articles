# Code Smell 304 - Null Pointer Exception

![Code Smell 304 - Null Pointer Exception](Code%20Smell%20304%20-%20Null%20Pointer%20Exception.png)

*I keep writing about NULL problems, yet every day the news reminds me: NULL is still alive and kicking.*

> TL;DR: Avoid NULL references that cause runtime crashes by using proper validation and null-safe patterns

# Problems 😔

- Runtime [crashes](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW)
- Big [incidents and outages](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW)
- Unpredictable behavior
- Hard debugging
- User frustration
- System instability
- Poor reliability

In the [Google Cloud](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW) case:

- Poor error handling: The code crashed instead of gracefully handling null data
- No [feature flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md): New code wasn't gradually rolled out with safety controls
- Instant global replication: Bad data spreads worldwide immediately, like in the [Crowdstrike Incident](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20260%20-%20Crowdstrike%20NULL/readme.md)
- No randomized backoff: Recovery caused infrastructure overload
- Inadequate testing: The failure scenario was never tested during deployment

# Solutions 😃

1. Avoid [nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)
2. Use null checks if nulls are beyond your control (for example, an external API)
3. Initialize default values
4. Implement guard clauses
5. Use [null objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)
6. Don't use [optionals](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)

# Refactorings ⚙️

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

# Context 💬

Last June 12th, 2025, a [major outage](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW) happened on Google Cloud Platform.

It affected dozens of Google Cloud and Google Workspace services globally from approximately 10:49 AM to 1:49 PM PDT (3 hours total), with some services taking longer to recover fully.

The outage was caused by a cascading failure in Google's API management system:

- The Trigger:

On May 29, 2025, Google deployed new code to "Service Control" (their API management system) that added additional quota policy checks. 

This code had a critical flaw. It lacked proper [error handling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md) and wasn't protected by [feature flags](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md).

- The Failure:

On June 12, a policy change containing blank/*NULL* fields was pushed to the global database that Service Control uses. When Service Control attempted to process these blank fields, it encountered a null pointer in the unprotected code path, resulting in the binaries crashing in an infinite loop.

- Global Impact: 

Since quota management is global, this corrupted data was replicated worldwide within seconds, causing Service Control to crash in every region.

Null pointer exceptions happen when you try to access methods or properties on objects that don't exist.

This happens when variables contain null references instead of valid object instances.

The problem becomes particularly dangerous in production environments where these exceptions can crash your application and frustrate users.

Languages like Java, C#, and JavaScript are especially prone to this issue, though modern language features and patterns can help you avoid these crashes entirely.

Nulls have been a big problem in the software industry for decades, but software engineers continue ignoring it despite its creator's warnings.

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/6b0da6ca7c478383367f9ae89e543807) -->

```java
public class ServiceControlPolicy {
  private SpannerDatabase spannerDB;
  private QuotaManager quotaManager;
    
  public void applyPolicyChange(PolicyChange change) {
      // NULL POINTER: change can be null
      Policy policy = spannerDB.getPolicy(change.getPolicyId());
      // NULL POINTER: policy can be null from the database
      String quotaField = policy.getQuotaField();
      // NULL POINTER: quotaField can be null (blank field)
      quotaManager.updateQuota(quotaField, change.getValue());
  }
    
  public void exerciseQuotaChecks(String region) {
      // NULL POINTER: policies list can be null
      List<Policy> policies = spannerDB.getPoliciesForRegion(region);
      for (Policy policy : policies) {
          // NULL POINTER: individual policy can be null
          String quotaValue = policy.getQuotaField();
          // NULL POINTER: quotaValue can be null before trim()
          quotaManager.checkQuota(quotaValue.trim());
      }
  }
    
  public boolean validatePolicyData(Policy policy) {
      // NULL POINTER: policy parameter can be null
      String quotaField = policy.getQuotaField();
      // NULL POINTER: quotaField can be null before length()
      return quotaField.length() > 0 && 
             !quotaField.equals("null");
  }
    
  public void replicateGlobally(PolicyChange change) {
      List<String> regions = getGlobalRegions();
      for (String region : regions) {
          // NULL POINTER: change.getPolicy() can return null
          spannerDB.insertPolicy(region, change.getPolicy());
      }
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/87d6ee97e5e944e39e8b4c2f8d2fa755) -->

```java
public class ServiceControlPolicy {
  private SpannerDatabase spannerDB;
  private QuotaManager quotaManager;
    
  public void applyPolicyChange(PolicyChange change) {
      if (change == null) {
          // Assuming it comes from an external API
          // Beyond your control
          change = new NullPolicyChange();
      }
      
      Policy policy = findPolicyOrNull(change.policyId());
      String quotaField = policy.quotaField();
      if (!quotaField.isEmpty()) {
          quotaManager.updateQuota(quotaField, change.value());
      }
  }
    
  public void exerciseQuotaChecks(String region) {
      if (region == null || region.isEmpty()) {
          // Assuming it comes from an external API
          // Beyond your control
          return;
      }
      
      List<Policy> policies = policiesOrEmpty(region);
      
      for (Policy policy : policies) {
          String quotaValue = policy.quotaField();
          if (!quotaValue.isEmpty()) {
              quotaManager.checkQuota(quotaValue.trim());
          }
      }
  }
    
  public boolean validatePolicyData(Policy policy) {
      if (policy == null) {
          // Assuming it comes from an external API
          // Beyond your control
          // From now on, you wrap it
          policy = new NullPolicy();
      }
      
      String quotaField = policy.quotaField();
      return quotaField.length() > 0;
  }
    
  public void replicateGlobally(PolicyChange change) {
      if (change == null) {
          // Assuming it comes from an external API
          // Beyond your control
          // From now on, you wrap it
          change = new NullPolicyChange();
      }
        
      Policy policy = change.policy();
      if (policy == null) {
          // Assuming it comes from an external API
          // Beyond your control
          // From now on, you wrap it
          policy = new NullPolicy();
      }
        
      List<String> regions = globalRegions();
      for (String region : regions) {
          spannerDB.insertPolicy(region, policy);
      }
  }
    
  private Policy findPolicyOrNull(String policyId) {
      Policy policy = spannerDB.policy(policyId);
      return policy != null ? policy : new NullPolicy();
  }
    
  private List<Policy> policiesOrEmpty(String region) {
      List<Policy> policies = spannerDB.policiesForRegion(region);
      if (policies == null) {
          // This is a good NullObject
          return Collections.emptyList();
      }
      
      return policies.stream()
              .map(p -> p != null ? p : new NullPolicy())
              .collect(Collectors.toList());
  }
}

class NullPolicy extends Policy {
  @Override
  public String quotaField() { return ""; }
    
  @Override
  public String policyId() { return "unknown-policy"; }
    
  @Override
  public Map<String, String> metadata() { 
      return Collections.emptyMap(); 
  }
}

class NullPolicyChange extends PolicyChange {
  @Override
  public String policyId() { return ""; }
    
  @Override
  public String value() { return ""; }
    
  @Override
  public Policy policy() { return new NullPolicy(); }
}
```

# Detection 🔍

[X] Semi-Automatic

You can detect potential null pointer exceptions by reviewing code for direct method calls on objects without null checks.

Linters can examine return values from methods that might return *Null*, looking for uninitialized object fields, and using static analysis tools that flag potential null dereferences.

Modern IDEs often highlight these issues with warnings.

# Tags 🏷️

- Null

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

In the [real world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), objects either exist or they don't.

When you model this correctly in your program, you create a clear [one-to-one correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between reality and code. 

Breaking this bijection by allowing null references creates phantom objects that exist in your code but not in the real world, leading to crashes when you try to interact with these non-existent entities.

If you choose to name your license plate "NULL", you will get [a lot of parking tickets](https://www.forbes.com/sites/zakdoffman/2019/08/14/hacker-gets-12000-in-parking-tickets-after-null-license-plate-trick-backfires/)

# AI Generation 🤖

AI generators frequently create code with null pointer vulnerabilities because they focus on happy path scenarios. 

They often generate method calls without considering edge cases where objects might be *NULL*, especially in complex object hierarchies or when dealing with external data sources.

# AI Detection 🧲

AI tools can detect and fix null pointer issues when you provide clear instructions about defensive programming practices.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Remove all Null References

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) | [ChatGPT](https://chat.openai.com/?q=Remove+all+Null+References%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) | [Claude](https://claude.ai/new?q=Remove+all+Null+References%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) | [Perplexity](https://www.perplexity.ai/?q=Remove+all+Null+References%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+all+Null+References%3A+%60%60%60java%0D%0Apublic+class+ServiceControlPolicy+%7B%0D%0A++private+SpannerDatabase+spannerDB%3B%0D%0A++private+QuotaManager+quotaManager%3B%0D%0A++++%0D%0A++public+void+applyPolicyChange%28PolicyChange+change%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+change+can+be+null%0D%0A++++++Policy+policy+%3D+spannerDB.getPolicy%28change.getPolicyId%28%29%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+can+be+null+from+the+database%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+can+be+null+%28blank+field%29%0D%0A++++++quotaManager.updateQuota%28quotaField%2C+change.getValue%28%29%29%3B%0D%0A++%7D%0D%0A++++%0D%0A++public+void+exerciseQuotaChecks%28String+region%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policies+list+can+be+null%0D%0A++++++List%3CPolicy%3E+policies+%3D+spannerDB.getPoliciesForRegion%28region%29%3B%0D%0A++++++for+%28Policy+policy+%3A+policies%29+%7B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+individual+policy+can+be+null%0D%0A++++++++++String+quotaValue+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++++++%2F%2F+NULL+POINTER%3A+quotaValue+can+be+null+before+trim%28%29%0D%0A++++++++++quotaManager.checkQuota%28quotaValue.trim%28%29%29%3B%0D%0A++++++%7D%0D%0A++%7D%0D%0A++++%0D%0A++public+boolean+validatePolicyData%28Policy+policy%29+%7B%0D%0A++++++%2F%2F+NULL+POINTER%3A+policy+parameter+can+be+null%0D%0A++++++String+quotaField+%3D+policy.getQuotaField%28%29%3B%0D%0A++++++%2F%2F+NULL+POINTER%3A+quotaField+c) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Null pointer exceptions represent one of the most common runtime errors in programming. 

You can remove most of these crashes by implementing proper null checks, using the Null Object design pattern, and adopting defensive programming practices. 

The small overhead of validation code pays off significantly in application stability and user experience.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 212 - Elvis Operator](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20212%20-%20Elvis%20Operator/readme.md)

[Code Smell 192 - Optional Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20192%20-%20Optional%20Attributes/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 208 - Null Island](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20208%20-%20Null%20Island/readme.md)

[Code Smell 252 - NullCustomer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20252%20-%20NullCustomer/readme.md)

[Code Smell 260 - Crowdstrike NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20260%20-%20Crowdstrike%20NULL/readme.md)

# More Information 📕

[Google Incident Report](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW)

[Null License Plate](https://www.wired.com/story/null-license-plate-landed-one-hacker-ticket-hell/)

[Null License Plate](https://www.forbes.com/sites/zakdoffman/2019/08/14/hacker-gets-12000-in-parking-tickets-after-null-license-plate-trick-backfires/)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> I call it my billion-dollar mistake. It was the invention of the null reference in 1965

_Tony Hoare_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)