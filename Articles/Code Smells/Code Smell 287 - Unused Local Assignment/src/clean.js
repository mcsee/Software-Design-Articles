function updateUserName(user, newname) {
  user.name = newname;
  // Just side effects without explicit return
}

function performMaintenance(existingUser) {
  updateUserName(existingUser, "Bobby Peru");
  // Other tasks
}