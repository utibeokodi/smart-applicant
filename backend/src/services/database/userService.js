const { User } = require('../../models/User.js');
const uuidv4 = require('uuid').v4;
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

const hash = promisify(bcrypt.hash);

class UserService {
  static async createUser(firstName, lastName, email, password) {
    const userId = uuidv4().trim();

    try {
      const hashedPassword = await hash(password, 10);
      const user = new User(userId, firstName, lastName, email, hashedPassword);

      await user.save();
      return user;
    } catch (err) {
      throw err;
    }
  }

  static async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }

  static async getUserByEmail(email) {
    const user = await User.findByEmail(email);
    return user;
  }

  static async verifyUser(user) {
    await user.updateUserDetails({ isVerified: true });
  }

  static async updatePassword(password, user) {
    const hashedPassword = await hash(password, 10);

    await user.updateUserDetails({ password: hashedPassword });
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = { UserService };
