const userSchema = {
  user_id: 'S', // String type
  first_name: 'S', // String type
  last_name: 'S', // String type
  email: 'S', // String type
  password: 'S', // String type
  isVerified: 'BOOL', // Boolean type
  createdAt: 'S', // String type - Dates are typically stored as strings in DynamoDB
};

module.exports = { userSchema };
