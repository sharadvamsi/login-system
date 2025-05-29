import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, dob, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, dob, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: _, ...safeUser } = user._doc; // remove password
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password: _, ...safeUser } = user._doc; // remove password
    res.json({ user: safeUser, token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
