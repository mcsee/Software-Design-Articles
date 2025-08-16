public class DatabaseConnection {
    public Object execute(String sql) {
        if (sql.startsWith("SELECT")) {
            return new ResultSet();
        } else if (sql.startsWith("INSERT")) {
            return Integer.valueOf(42);
        } else if (sql.startsWith("UPDATE")) {
            return Boolean.TRUE;
        }
        return null;
        // The billion dollar mistake
    }
}

public class QueryHandler {
    public void handle(String sql, DatabaseConnection db) {
        Object result = db.execute(sql);
        // The caller needs to be aware of many different types
        if (result instanceof ResultSet) {
            System.out.println("Fetched rows");
        } else if (result instanceof Integer) {
            System.out.println("Inserted " + result);
        } else if (result instanceof Boolean) {
            System.out.println("Updated " + result);
        } else {
            System.out.println("Unknown result");
        }
    }
}

// This second class has a method execute()
// which is NOT polymorphic since it returns 
// another types
public class NonRelationalDatabaseConnection {
    public Object execute(String query) {
        if (query.startsWith("FIND")) {
            return new Document();
        } else if (query.startsWith("INSERT")) {
            return Integer.valueOf(1);
        } else if (query.startsWith("UPDATE")) {
            return Boolean.TRUE;
        }
        return null; // The billion dollar mistake
    }
}

