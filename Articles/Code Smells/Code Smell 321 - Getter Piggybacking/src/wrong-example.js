// Food needs to show its use-by date on the shelf
// label, so useByDate() exists for that one reason.
//
// Later, removeExpiredFood() needs to pull expired
// products, so it reuses useByDate() and compares the
// result to today itself, outside Food.
//
// flagNearExpiryFood() needs almost the same check, so
// it also calls useByDate() and writes its own slightly
// different comparison.
//
// Now two functions decide what "expired" means, and
// neither of them is Food.
class Food {
  constructor(name, useByDate) {
    this.name = name;
    this.useByDateValue = useByDate;
  }

  useByDate() {
    return this.useByDateValue;
  }
}

function removeExpiredFood(shelf, today) {
  return shelf.filter(
    food => food.useByDate() >= today
  );
}

function flagNearExpiryFood(
  shelf, today, warningDays
) {
  return shelf.filter(food => {
    const daysLeft = daysBetween(
      food.useByDate(), today
    );
    return daysLeft >= 0 &&
      daysLeft <= warningDays;
  });
}
