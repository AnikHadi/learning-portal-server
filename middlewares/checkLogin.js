const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const secret = process.env.JWT_TOKEN;
    const token = authorization.split(" ")[1];
    jwt.verify(token, secret, function (err, decode) {
      if (err) {
        return res.status(403).send({ message: "Forbidden Access" });
      }
      req.decode = decode;
      next();
    });
    // req.username = decode.username;
    // req.userID = decode.userId;
    // next();
  } catch (error) {
    next("UnAuthorized Access");
  }
};

module.exports = checkLogin;

// const verifyJWT = async (req, res, next) => {
//   const { authorization } = req.headers;
//   try {
//     const token = authorization.split(" ")[1];
//     const decode = jwt.verify(token, process.env.JWT_TOKEN);
//     jwt.verify(token, process.env.JWT_TOKEN, (err, decode) => {
//       if (err) {
//         return res.status(403).send({ message: "Forbidden Access" });
//       }
//       req.decode = decode;
//       next();
//     });
//   } catch (error) {}
//   if (!authorization) {
//     return res.status(401).send({ message: "UnAuthorized Access" });
//   }
// };
