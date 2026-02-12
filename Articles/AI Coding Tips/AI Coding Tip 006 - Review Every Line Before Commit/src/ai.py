class DatabaseManager:
    _instance = None # Singleton Anti Pattern
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    def get_data(self, id):
        return eval(f"SELECT * FROM users WHERE id={id}") 
        # SQL injection!
        
    ## 741 more cryptic lines