public class QueryBuilder {
    public String buildEmployeeQuery() {
        String sql = "SELECT emp.employee_id, " +
                     "emp.first_name, emp.last_name, " +
                     "       dept.department_name, " +
                     "emp.salary " +
                     "FROM employees emp " +
                     "JOIN departments dept ON " +
                     "emp.department_id = " +
                     "dept.department_id " +
                     "WHERE emp.salary > ? " +
                     "  AND dept.location = ? " +
                     "ORDER BY emp.salary DESC";
        return sql;
    }
    
    public String buildJsonPayload(String name, int age) {
        String json = "{\n" +
                      "  \"name\": \"" + name + "\",\n" +
                      "  \"age\": " + age + ",\n" +
                      "  \"address\": {\n" +
                      "    \"street\": " +
                      "\"123 Main St\",\n" +
                      "    \"city\": \"New York\"\n" +
                      "  }\n" +
                      "}";
        return json;
    }
}