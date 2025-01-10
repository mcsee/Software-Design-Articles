public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {}

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public void connect() { 
    }
}

public class Service {
    public void performTask() {
        DatabaseConnection connection = 
            DatabaseConnection.getInstance();
        connection.connect(); 
    }
}
