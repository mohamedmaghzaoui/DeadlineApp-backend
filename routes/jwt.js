//create token when user is logged in
const { sign } = require("jsonwebtoken");
require("dotenv").config();
const tokenPassword = process.env.TOKEN_PASSWORD;
const createToken = (user) => {
  const token = sign(
    {
      name: user.name,
      role: user.role,
      id: user.id,
    },
    tokenPassword
  );
  return token;
};
module.exports = { createToken };
