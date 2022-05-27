const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

router.post(
  "/register",
  [
    check("email", "invalid email").isEmail(),
    check("password", "Min length 6 char").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "incorrect registration data",
        });
      }
      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });

      await user.save();

      return res.status(201).json({ message: "New user created" });
    } catch (error) {
      res.status(500).json({ message: "Somethings error... Try again" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "invalid email").normalizeEmail().isEmail(),
    check("password", "Enter password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "incorrect login data",
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Password wrong" });
      }

      const token = jwt.sign({ user: user.id }, config.get("jwtSecret"), {
        expiresIn: "14d",
      });

      res.json({ token, userId: user.id });
    } catch (error) {
      res.status(500).json({ message: "Somethings error... Try again" });
    }
  }
);
module.exports = router;
