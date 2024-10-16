const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/People");
const UserActivity = require("../models/UserActivitySchema");

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Login failed! Username is invalid.",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Login failed! Password is incorrect",
      });
    }

    const payload = {
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.name,
      mobile: user.mobile,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.locals.loggedInUser = payload;

    const now = new Date();
    await User.findByIdAndUpdate(user._id, { lastActivity: now });

    const userActivity = new UserActivity({
      username: user.email,
      lastLoginTime: now,
      sessionToken: token,
    });
    await userActivity.save();

    return res.status(200).json({
      message: "Login successful!",
      token,
      userid: user._id,
      username: user.name,
      email: user.email,
      profile: user?.profile,
      role: user.role,
      statusbar: "Success",
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server error ${err}`,
    });
  }
};

const logout = async (req, res) => {
  console.log("Response logged out", res);
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged Out Successfully");
};

const getUserActivity = async (req, res, next) => {
  try {
    // Fetch user activity data from the database
    const userActivity = await UserActivity.find();

    // Return user activity data as response
    return res.status(200).json({
      message: "User activity retrieved successfully",
      userActivity,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server error ${err}`,
    });
  }
};
const deleteUserActivity = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await UserActivity.findByIdAndDelete(id);
    res.status(200).send(`Document with ${data.name} has been deleted... `);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
  logout,
  getUserActivity,
  deleteUserActivity,
};
