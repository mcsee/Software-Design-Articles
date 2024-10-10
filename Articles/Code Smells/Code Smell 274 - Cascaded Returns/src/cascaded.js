function discount(price, isMember) {
  if (price < 20) {
    if (isMember) {
      return 5;
    } else {
      return 2;
    }
  } else {
    if (isMember) {
      return 10;
    } else {
      return 0;
    }
  }
}
