function updateUserName(user, newname) {
  user.name = newname;
  return user;
}

function performMaintenance(existingUser) {
  let updatedUser = updateUserName(existingUser, "Bobby Peru");
  // Other tasks
}
// The variable updatedUser is never used