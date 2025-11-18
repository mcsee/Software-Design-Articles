public class QueryBuilder {
    public String buildEmployeeQuery() {
        // 1. Identify multi-line string concatenations or strings 
        // with excessive escape sequences
        // 2. Replace opening quote and concatenation operators 
        // with triple quotes (""")
        // 3. Remove escape sequences for quotes and newlines
        // 4. Adjust indentation to match your code style
        // 5. Add .strip() for single-line regex patterns or
        // when trailing newlines cause issues
        // pro tip: If you put a known prefix 
        // after the string delimiter
        // many IDEs will adjust the syntax highlighter and linter
        // in this case SQL
        String sql = """SQL
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
        // pro tip: If you put a known prefix 
        // after the string delimiter
        // many IDEs will adjust the syntax highlighter and linter
        // in this case json5        
        String json = """json5
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