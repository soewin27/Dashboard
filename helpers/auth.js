const db = require("../database/models/index");
const User = db.User;
const bcrypt = require("bcryptjs");
const { createToken,validateToken } = require("../helpers/jwt");

const  cookieParser  =require("cookie-parser")
// const jwt = require('jsonwebtoken');
const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      nickName,
      uniqueName,
      phone,
      email,
      password,
      accountStatus,
      userType,
    } = req.body;
    if (
      !(
        nickName &&
        uniqueName &&
        email &&
        password &&
        firstName &&
        lastName &&
        accountStatus &&
        userType &&
        phone
      )
    ) {
      res.status(400).send({
        status: false,
        message: "Please Input Required Field",
      });
    }

    const createdUser = await User.findOne({ where: { phone } });

    if (createdUser) {
      return res.status(409).send({
        status: false,
        message: "User Already Exist.Please Login!!",
      });
    }

    encryptedPassword = await bcrypt.hash(password, 6);

    const user = await User.create({
      firstName,
      lastName,
      nickName,
      uniqueName,
      accountStatus,
      userType,
      phone,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    res.status(200).send({
      status: true,
      message: "create user successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      status: false,
      error: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ where: { phone: phone } });
    if (!user) {
      res.status(400).send({
        status: false,
        message: "User Doesn't exist",
      });
    } else if (user.accountStatus == "DEACTIVATED") {
      res.status(400).send({
        status: false,
        message: "This user is deactivated",
      });
    } else {
      const userpassword = user.password;
      const match = await bcrypt.compare(password, userpassword);
      if (!match) {
        res.status(400).send({
          status: false,
          message: "User's Password is incorrect",
        });
      } else {
        const accessToken = createToken(user);
        res.cookie("access-token", accessToken, {
          maxAge:30 * 24 * 60 * 60 * 1000
        });
        res.status(200).send({
          status: true,
          message: "Login Successful",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Login Fail",
      error: error,
    });
  }
};
const show = async (req, res) => {
  try {
    await validateToken(req, res, () => {
      res.status(200).send({
        status: true,
        message: "User is Authenticated",
        data: req.authenticated,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      error: error,
    });
  }
};

module.exports = {
  register,
  login,
  show
};
