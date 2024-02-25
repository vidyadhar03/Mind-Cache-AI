require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

module.exports = {
  auth: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "Authentication Error." });
    }
    try {
      const decoded = jwt.verify(authHeader, secret);
      console.log(decoded.id);
      if (decoded && decoded.userId) {
        // req.userId = decoded.id;
        next();
      } else {
        return res.status(403).json({ message: "Authentication Error." });
      }
    } catch (e) {
      return res.status(403).json({ message: "Authentication Error." });
    }
  },
};
