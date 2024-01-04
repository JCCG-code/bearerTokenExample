import jwt from "jsonwebtoken";
import fs from "fs-extra";
import { Router } from "express";

import { verifyToken } from "./verifyToken.js";

const router = Router();

/**
 * Write an user received by request body into a json file for saving user token
 */
router.post("/signIn", async (req, res) => {
  try {
    const { userId, username } = req.body;
    // Extract user token
    const token = jwt.sign({ id: userId }, "secret", { expiresIn: 86400 });
    // Extract current user in session
    const userSessionJSON = await fs.readJson("./src/session.json");
    // Update fields
    userSessionJSON.userId = userId;
    userSessionJSON.username = username;
    userSessionJSON.token = token;
    // Update user in session
    await fs.writeJson("./src/session.json", userSessionJSON, { spaces: 2 });

    // // Return user
    return res.status(200).json(userSessionJSON);
  } catch (err) {
    return res.status(400).json(err);
  }
});

/**
 * Standard route which uses a verifyToken middleware for testing Bearer token functionality
 */
router.get("/", verifyToken, (req, res) => {
  return res.json({ message: "Congrats! You can access to this path :)" });
});

export default router;
