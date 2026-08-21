// Food still exposes useByDate() for the shelf label.
//
// Being expired is now a question Food answers itself,
// through isExpiredOn(), instead of every external
// function reimplementing the comparison from the
// getter on its own.
class Food {
  constructor(name, useByDate) {
    this.name = name;
    this.useByDateValue = useByDate;
  }

  useByDate() {
    return this.useByDateValue;
  }

  isExpiredOn(today) {
    return this.useByDateValue < today;
  }

  daysUntilExpiryFrom(today) {
    return daysBetween(this.useByDateValue, today);
  }
}

function removeExpiredFood(shelf, today) {
  return shelf.filter(food => !food.isExpiredOn(today));
}

function flagNearExpiryFood(shelf, today, warningDays) {
  return shelf.filter(food => {
    const daysLeft = food.daysUntilExpiryFrom(today);
    return daysLeft >= 0 && daysLeft <= warningDays;
  });
}
