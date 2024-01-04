import jwt from "jsonwebtoken";
import fs from "fs-extra";

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

      // Extract current user in session
      const userSessionJSON = await fs.readJson("./src/session.json");

      // If decoded id is different to userId written into session.json, the provided token is invalid
      if (userSessionJSON.userId !== decoded.id) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      } else {
        next();
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
