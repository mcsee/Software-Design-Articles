<? 

class UserDirectory {
// 1. Create a new class to represent the specific collection
// This is a real world concept reified  
// 2. Define a private property
private array $elements = [];

    // 3. Implement a constructor that accepts only User types
    public function __construct(User ...$users) {
        $this->elements = $users;
    }

    // 4. Add type-hinted methods to add elements
    public function add(User $user): void {
        $this->elements[] = $user;
    }

    // 5. Move collection-specific logic inside
    public function notifyAll(): void {
        foreach ($this->elements as $user) {
            $user->sendNotification();
        }
    }
}