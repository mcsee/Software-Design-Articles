<?php
// @author John Wick
// @version 3.14
// @description Service for user operations
class UserService {
    /**
     * @deprecated
     * @param int $id
     * @return string
     */
    public function userName($id) {
        // @todo Sanitize input
        return $this->database->query(
            "SELECT name FROM users WHERE id = $id");
    }
}