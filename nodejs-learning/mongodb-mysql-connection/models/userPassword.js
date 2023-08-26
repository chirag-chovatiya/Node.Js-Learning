const bcrypt = require("bcrypt");
const saltRounds = parseInt(process.env.BCRYPT_ROUNDS);

const hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
const comparePassword = async function (password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
};

module.exports = {
  hashPassword,
  comparePassword,
};
