const getProblem = require("./get-problem");
const getProblems = require("./get-problems");

module.exports = {
  "/api/problem/{id}": {
    ...getProblem,
  },
  "/api/problem": {
    ...getProblems,
  },
};
