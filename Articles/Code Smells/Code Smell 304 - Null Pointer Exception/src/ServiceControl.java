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