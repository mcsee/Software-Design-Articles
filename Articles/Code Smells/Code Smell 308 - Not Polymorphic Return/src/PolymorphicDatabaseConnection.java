interface QueryResult {
    void display();
}

class SelectResult implements QueryResult {
    public void display() {
        System.out.println("Fetched rows");
    }
}

class InsertResult implements QueryResult {
    private final int count;
    InsertResult(int count) { this.count = count; }
    public void display() {
        System.out.println("Inserted " + count);
    }
}

class UpdateResult implements QueryResult {
    private final boolean ok;
    UpdateResult(boolean ok) { this.ok = ok; }
    public void display() {
        System.out.println("Updated " + ok);
    }
}

class DocumentResult implements QueryResult {
    public void display() {
        System.out.println("Fetched documents");
    }
}

interface DatabaseConnection {
    QueryResult execute(String query);
}

public class RelationalDatabaseConnection 
  implements DatabaseConnection {
    public QueryResult execute(String sql) {
        // execute() is now polymorphic and returns a QueryResult
        if (sql.startsWith("SELECT")) {
            return new SelectResult();
        } else if (sql.startsWith("INSERT")) {
            return new InsertResult(42);
        } else if (sql.startsWith("UPDATE")) {
            return new UpdateResult(true);
        }
        // You remove null
        throw new IllegalArgumentException("Unknown SQL");
    }
}

public class NonRelationalDatabaseConnection 
  implements DatabaseConnection {
    public QueryResult execute(String query) {
        // execute() is now polymorphic and returns a QueryResult
        if (query.startsWith("FIND")) {
            return new DocumentResult();
        } else if (query.startsWith("INSERT")) {
            return new InsertResult(1);
        } else if (query.startsWith("UPDATE")) {
            return new UpdateResult(true);
        }
        throw new IllegalArgumentException("Unknown query");
    }
}

public class QueryHandler {
    public void handle(String sql, DatabaseConnection db) {
        QueryResult result = db.execute(sql);
        result.display();
    }
}
