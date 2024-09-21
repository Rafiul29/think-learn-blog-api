const { use } = require("../../routes");
const { verifyToken } = require("../../services/token");
const { findUserByEmail } = require("../../services/user");
const { authticationError } = require("../../utils/error");

const authenticate = async (req, res, next) => {
  try {
    const token = req?.headers?.authorization.split(" ")[1];

    const decoded = verifyToken({ token });
    const user = await findUserByEmail(decoded.email);
    

    if (!user) {
      next(authticationError());
    }

    if (user?.status !== "approved") {
      next(authticationError(`Your account is ${user?.status}`));
    }
    req.user = {...user._doc,id:user.id};
    next()
  } catch (e) {
    next(authticationError());
  }
};

module.exports = authenticate;
