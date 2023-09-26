//middelware
const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  require("dotenv").config();
  const tokenPassword = process.env.TOKEN_PASSWORD;
  const token = req.header("token");
  if (!token) {
    return res.json({ error: "user is not logged in" });
  }
  try {
    const validateToken = verify(token, tokenPassword);
    if (validateToken) {
      next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
module.exports = { validateToken };
