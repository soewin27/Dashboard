const { sign, verify } = require("jsonwebtoken");
const  cookieParser  = require("cookie-parser")

const createToken = (user) => {
  const accessToken = sign({ phone: user.phone, id: user.id }, "jwtsecret");
  return accessToken;
};
const validateToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    res.status(400).send({
      status: false,
      message: "User is not Authenicated!",
    });
    return
  }
  try {
    const validtoken = verify(accessToken, "jwtsecret");
    console.log(validtoken)
    if (validtoken) {
      req.authenicated = true;
      return next();
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error,
    });
  }
};
module.exports = {
  createToken,
  validateToken,
};
