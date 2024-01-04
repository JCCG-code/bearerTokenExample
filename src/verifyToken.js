import jwt from "jsonwebtoken";

// Verify token for user session
export const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    else {
      const bearerHeaderSplit = bearerHeader.split(" ", 2);
      const token = bearerHeaderSplit[1];

      const decoded = jwt.verify(token, "secret");

      const userInSession = await User.findOne({ _id: decoded.id });

      if (!userInSession)
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      else {
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
