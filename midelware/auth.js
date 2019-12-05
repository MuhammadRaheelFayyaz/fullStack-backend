const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
module.exports = (req, res, next) => {
  //get header
  const authHeader = req.get("Authorization");
  //check header exist or not
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  //get token
  const token = authHeader.split(" ")[1];
  //check token
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_KEY);
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.user_id;
  next();
};
