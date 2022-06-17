const User = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: '1', url: '2' },
    });

    const token = user.generateWebToken();

    // Saving token into cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(201).cookie('token', token, options).json({
      success: true,
      message: 'User Created successfully',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please enter email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordMatched = user.matchPassword(password);

    if (!isPasswordMatched) {
      res.status(401).json({
        success: fail,
        message: 'Invalid email or password',
      });
    }

    const token = user.generateWebToken();

    // Saving token into cookie
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    res.status(200).cookie('token', token, options).json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { registerUser, loginUser };
