const getUsers = require("./get-users");
const loginUser = require("./login-user");
const signUpUser = require("./sign-up");

module.exports = {
  "/api/user": {
    ...getUsers,
  },
  "/api/user/login": {
    ...loginUser,
  },
  "/api/user/signup": {
    ...signUpUser,
  },
};
