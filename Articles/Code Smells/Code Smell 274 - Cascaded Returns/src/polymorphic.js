class Member {
  discount(price) {
    return price < 20 ? 5 : 10;
    // This ternary is an essential IF
    // And you should NOT remove it
  }
}

class NonMember {
  discount(price) {
    return price < 20 ? 2 : 0;
    // This ternary is an essential IF
    // And you should NOT remove it
  }
}

function discount(price, status) {
  return status.discount(price);
}

const member = new Member();
const nonMember = new NonMember();
