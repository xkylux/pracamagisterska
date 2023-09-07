const jwt = require("jsonwebtoken");

const authorizationToken = (_id, name, lastName, email, isAdmin) => {
  return jwt.sign(
    { _id, name, lastName, email, isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "8h" }
  );
};
module.exports = authorizationToken
