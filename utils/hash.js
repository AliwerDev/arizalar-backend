const bcrypt = require("bcrypt");

const generateHash = async (password) => {
  const solt = await bcrypt.genSalt();
  const hashPwd = await bcrypt.hash(password, solt);
  return hashPwd;
};

const compaireHash = async (password, oldPassword) => {
  const isValid = await bcrypt.compare(password, oldPassword);
  return isValid;
};

module.exports.generateHash = generateHash;
module.exports.compaireHash = compaireHash;
