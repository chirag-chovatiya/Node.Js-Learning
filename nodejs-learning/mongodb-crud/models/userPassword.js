const bcrypt = require("bcrypt");
const saltValue = parseInt(process.env.BCRYPT_ROUNDS);

const password = async function (password) {
  const hashedPassword = await bcrypt.hash(password, saltValue);
  return hashedPassword;
};

module.exports = password;
