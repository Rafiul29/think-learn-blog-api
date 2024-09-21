const bcrypt = require("bcrypt");

const generateHash = async (payload,saltRound=10) => {
  const salt = await bcrypt.genSalt(saltRound);
  const hash = bcrypt.hash(payload, salt);

  return hash;
};

const hasMatched = async (raw, hash) => {

  const result = await bcrypt.compare(raw, hash);
  return result;
};

module.exports = {
  generateHash,
  hasMatched,
};
