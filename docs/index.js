const basicInfo = require("./basic-info");
const tags = require("./tags");
const components = require("./components");
const servers = require("./servers");
const paths = require("./paths");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...paths,
};
