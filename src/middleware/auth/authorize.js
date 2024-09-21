const { authorizationError } = require("../../utils/error");

// function authorize(roles) {
//   return (req, res, next) => {
//     console.log("dq");
//   };
// }

const authorize =
  (roles = []) =>
  (req, res, next) => {
    if (roles.includes(req?.user?.role)) {
      return next();
    }else{
      return next(authorizationError());
    }
  };

module.exports = authorize;
