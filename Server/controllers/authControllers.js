import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDB from '../DB/db.js';

const login = async (req, res) => {
  try {
    await connectToDB();
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '10d' },
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error('Error in login:', err);
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: err.message,
      });
  }
};

const signup = async (req, res) => {
  const { username, email, password, role, profileImage } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: 'Email is already register' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res
      .status(500)
      .json({
        success: false,
        message: 'Internal server error',
        error: err.message,
      });
  }
};

const verify = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: 'User is authenticated', user: req.user });
};

export { login, signup, verify };
