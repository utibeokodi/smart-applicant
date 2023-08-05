const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

class User {
  constructor(
    userId,
    firstName,
    lastName,
    email,
    hashedPassword,
    isVerified = false,
    createdAt = new Date().toISOString(),
  ) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.hashedPassword = hashedPassword;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
  }

  async save() {
    const existingUser = await User.findByEmail(this.email);

    if (existingUser) {
      throw new Error('User with the given email already exists');
    }

    const params = {
      TableName: process.env.SMART_APPLICANT_USER_TABLE,
      Item: {
        user_id: this.userId,
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.hashedPassword,
        isVerified: this.isVerified,
        createdAt: this.createdAt,
      },
    };

    try {
      await docClient.put(params).promise();
      return this;
    } catch (err) {
      throw err;
    }
  }

  static async findByEmail(email) {
    const params = {
      TableName: process.env.SMART_APPLICANT_USER_TABLE,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    try {
      const result = await docClient.query(params).promise();
      if (result.Items.length === 0) {
        return null;
      }

      const item = result.Items[0];

      return new User(
        item.user_id,
        item.first_name,
        item.last_name,
        item.email,
        item.password,
        item.isVerified,
        item.createdAt,
      );
    } catch (err) {
      throw err;
    }
  }

  static async findById(userId) {
    const params = {
      TableName: process.env.SMART_APPLICANT_USER_TABLE,
      Key: {
        user_id: userId,
      },
    };

    try {
      const result = await docClient.get(params).promise();
      if (!result.Item) {
        return null;
      }

      return new User(
        result.Item.user_id,
        result.Item.first_name,
        result.Item.last_name,
        result.Item.email,
        result.Item.password,
        result.Item.isVerified,
        result.Item.createdAt,
      );
    } catch (err) {
      throw err;
    }
  }

  /**
     * Updates user details in the database.
     *
     * @async
     * @param {Object} newDetails - An object containing the details to be updated. The keys are the field names, and the values are the new values for those fields.
     * @throws Will throw an error if the update operation fails.
     *
     * @example
     * await updateUserDetails({
     *   first_name: 'NewFirstName',
     *   last_name: 'NewLastName',
     *   email: 'newemail@example.com',
     *   password: 'newPassword',
     *   isVerified: true
     * });
     */
  async updateUserDetails(newDetails = {}) {
    if (Object.keys(newDetails).length === 0) {
      return;
    }

    const updateExpressions = [];
    const expressionAttributeValues = {};

    for (const [key, value] of Object.entries(newDetails)) {
      updateExpressions.push(`${key} = :${key}`);
      expressionAttributeValues[`:${key}`] = value;
    }

    const params = {
      TableName: process.env.SMART_APPLICANT_USER_TABLE,
      Key: {
        user_id: this.userId,
      },
      UpdateExpression: `set ${updateExpressions.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'UPDATED_NEW',
    };

    try {
      await docClient.update(params).promise();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = { User, docClient };
