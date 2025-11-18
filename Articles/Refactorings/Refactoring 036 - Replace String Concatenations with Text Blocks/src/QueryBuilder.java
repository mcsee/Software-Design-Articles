public class QueryBuilder {
    public String buildEmployeeQuery() {
        // 1. Identified multi-line string concatenation
        // 2. Replaced quotes and + operators with """
        // 3. Removed \n escape sequences
        // 4. Adjusted indentation
        String sql = """
            SELECT emp.employee_id, emp.first_name, 
                   emp.last_name,
                   dept.department_name, emp.salary
            FROM employees emp
            JOIN departments dept ON 
                 emp.department_id = dept.department_id
            WHERE emp.salary > ?
              AND dept.location = ?
            ORDER BY emp.salary DESC
            """;
        return sql;
    }
    
    public String buildJsonPayload(String name, int age) {
        // 1. Identified concatenation with escape sequences
        // 2. Replaced with text block using """
        // 3. Removed \" and \n escapes
        // 4. Preserved natural indentation
        // 5. No .strip() needed here
        String json = """
            {
              "name": "%s",
              "age": %d,
              "address": {
                "street": "123 Main St",
                "city": "New York"
              }
            }
            """.formatted(name, age);
        return json;
    }
}