const { sign } = require("jsonwebtoken");
const createToken = (user) => {
  const token = sign(
    {
      name: user.name,
      role: user.role,
      id: user.id,
    },
    "8280secret"
  );
  return token;
};
module.exports = { createToken };
