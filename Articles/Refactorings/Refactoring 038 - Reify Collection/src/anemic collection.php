<?

/** @var User[] $users */
// this is a static declaration used by many IDEs but not the compiler
// Like many comments it is useless, and possible outdated

function notifyUsers(array $users) {
    foreach ($users as $user) {
        // You have no guarantee $user is actually a User object
        // The comment above is 
        // just a hint for the IDE/Static Analysis
        $user->sendNotification();
    }
}

$users = [new User('Anatoli Bugorski'), new Product('Laser')]; 
// This array is anemic and lacks runtime type enforcement
// There's a Product in the collection and will show a fatal error
// unless it can understand #sendNotification() method

notifyUsers($users);