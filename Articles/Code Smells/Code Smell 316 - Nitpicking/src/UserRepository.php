<?php

class UserRepository {
    public function find($id){
        $conn = mysqli_connect(
             "localhost", // Pull Request comment - Bad indentation
            "root",
            "password123",
            "app"
        );

        $query = "Select * FROM users WHERE id = $id";
        // Pull Request comment - SELECT should be uppercase
        return mysqli_query($conn, $query);
    }
}
