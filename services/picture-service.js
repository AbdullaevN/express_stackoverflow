const { v4: uuid } = require("uuid");
const { Picture } = require("../models");
const path = require("path");

const createPicture = async (image, problemId) => {
  if (image) {
    let fileName = uuid() + "." + image.mimetype.split("/")[1];
    image.mv(path.resolve("static", fileName));
    await Picture.create({ image: fileName, problemId });
  }
};

module.exports = {
  createPicture,
};
