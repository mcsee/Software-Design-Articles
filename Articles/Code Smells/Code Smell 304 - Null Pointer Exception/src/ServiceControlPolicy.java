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