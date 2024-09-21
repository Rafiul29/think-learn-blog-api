const { userExist, createUser, findUserByEmail } = require("../user");
const { badRequest } = require("../../utils/error");
const { generateHash, hasMatched } = require("../../utils/hasing");
const { generateToken } = require("../token");

const register = async ({ name, email, password }) => {
  const hasUser = await userExist(email);

  if (hasUser) {
    throw badRequest("User already exist");
  }

  password = await generateHash(password, 10);
  const user = await createUser({ name, email, password });

  return user;
};

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw badRequest("Invalid Credentials");
  }

  const mathched = await hasMatched(password, user.password);
  
  if (!mathched) {
    throw badRequest("Invalid Credentials");
  }

  //  generate token
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken =  generateToken({ payload });

  return accessToken
};

module.exports = { register, login };
