const ErrorHandler = require("./../utils/error-handler.js");

const { User } = require("./../models/index.js");
const bcrypt = require("bcrypt");
const { v4: uuid } = require("uuid");
const {
  USER_ALREADY_EXISTS,
  USER_NOT_FOUND,
  WRONG_CREDENTIALS,
} = require("../utils/consts");
const { generateTokens } = require("../utils/tokens.js");
const { sendActivationMail } = require("./mail-service.js");

const signup = async (email, password, firstName, lastName, role) => {
  const oldUser = await User.findOne({ where: { email } });

  if (oldUser) {
    throw ErrorHandler.BadRequest(USER_ALREADY_EXISTS);
  }

  const hashedPassword = await bcrypt.hash(password, 3);
  const activationLink = uuid();
  const user = await User.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    role,
    activationLink,
  });
  await sendActivationMail(
    email,
    `${process.env.API}/api/user/activate/${activationLink}`
  );
  const tokens = generateTokens({ id: user.id, email, role });
  return tokens;
};

const activate = async (link) => {
  const user = await User.findOne({ where: { activationLink: link } });
  if (!user) {
    throw ErrorHandler.BadRequest("Activation link is incorrect");
  }
  user.isActivated = true;
  await user.save();
};

const statuses = {
  active: async () => {
    return await User.findAll({ where: { isActivated: true } });
  },
  inactive: async () => {
    return await User.findAll({ where: { isActivated: false } });
  },
  default: async () => await User.findAll(),
};

const getAll = async (status) => {
  return statuses[status] ? statuses[status]() : statuses["default"]();
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw ErrorHandler.BadRequest(USER_NOT_FOUND);
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw ErrorHandler.BadRequest(WRONG_CREDENTIALS);
  }
  const tokens = generateTokens({ id: user.id, email, role: user.role });
  return tokens;
};
module.exports = {
  signup,
  getAll,
  login,
  activate,
};
