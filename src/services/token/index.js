const jwt = require('jsonwebtoken');
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SERECT,
}) => {
  try {
    return jwt.sign(payload, secret, {algorithm });
  } catch (e) {
  
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithm });
  } catch (e) {
    console.log(e)
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secret = process.env.ACCESS_TOKEN_SERECT
}) => {
  try {
    return jwt.verify(token, secret, { algorithms: [algorithm] });
  } catch (e) {
    throw serverError();
  }
};

module.exports = { generateToken, decodeToken, verifyToken };
