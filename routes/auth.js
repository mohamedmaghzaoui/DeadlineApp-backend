const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.json({ error: "user is not logged in" });
  }
  try {
    const validateToken = verify(token, "8280secret");
    if (validateToken) {
      next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};
module.exports = { validateToken };
