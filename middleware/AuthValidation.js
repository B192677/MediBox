const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { User } = require("../model/user");
const { Admin } = require("../model/admin");

module.exports = (roles = []) => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId || decoded.id; // 🔥 Support both keys

      let currentUser = await Admin.findById(userId);
      if (currentUser && !currentUser.role) {
        currentUser.role = "admin"; // 🔥 Default role if missing
      }

      if (!currentUser) {
        currentUser = await User.findById(userId);
        if (currentUser && !currentUser.role) {
          currentUser.role = "user"; // 🔥 Default role if missing
        }
      }

      if (!currentUser) {
        return res.status(401).json({ message: "User not found" });
      }

      console.log("User role from DB:", currentUser.role);
      console.log("Allowed roles:", roles);

      if (roles.length && !roles.includes(currentUser.role)) {
        return res.status(403).json({ message: "Forbidden: Insufficient role" });
      }

      req.user = currentUser;
      next();
    } catch (err) {
      console.error("JWT Error:", err.name, err.message);
      return res.status(401).json({
        message: "Invalid or expired token",
        error: err.message,
        name: err.name,
      });
    }
  };
};
