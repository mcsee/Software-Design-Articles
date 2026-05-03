export default class UserHelpers {
  static getFullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  static getCategory(userPoints) {
    return userPoints > 70 ? 'A' : 'B';
  }
}

// Notice static methods
import UserHelpers from './UserHelpers';

const alice = {
   firstName: 'Alice',
   lastName: 'Gray',
   points: 78,
};

const fullName = UserHelpers.getFullName(alice);
const category = UserHelpers.getCategory(alice);