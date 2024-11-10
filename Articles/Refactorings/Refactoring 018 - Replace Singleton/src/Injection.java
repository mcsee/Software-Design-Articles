public class DatabaseConnection {  
    // 1. Identify the singleton 
    public void connect() { 
    }
}

public class Service {
    // 2. Locate all references to its getInstance() method.
    private DatabaseConnection connection;

    // 3. Refactor the singleton to a standard class. 
    public Service(DatabaseConnection connection) {
        // 4. Inject it as a dependency.
        this.connection = connection;
    }

    public void performTask() {
        connection.connect(); 
    }
}

DatabaseConnection connection = new DatabaseConnection();
// You can also mock the connection in your tests

Service service = new Service(connection);
service.performTask();