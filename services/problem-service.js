const { Op } = require("sequelize");
const { NOT_FOUND } = require("../utils/consts");
const ErrorHandler = require("../utils/error-handler");
const { Problem, Picture } = require("./../models");

const PictureService = require("./../services/picture-service.js");

const create = async (title, description, userId, tag, images) => {
  const problem = await Problem.create({ title, description, userId, tag });

  if (Array.isArray(images)) {
    images.forEach((i) => {
      PictureService.createPicture(i, problem.id);
    });
  } else {
    PictureService.createPicture(images, problem.id);
  }
  return problem;
};

const getAll = async ({ q, offset, limit, tag }) => {
  if (q || tag) {
    if (!q) q = "";
    if (tag) {
      return await Problem.findAndCountAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
          tag,
        },
        include: [
          {
            model: Picture,
          },
        ],
        limit,
        offset,
      });
    } else {
      return await Problem.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: "%" + q + "%",
          },
        },
        include: [
          {
            model: Picture,
          },
        ],
        limit,
        offset,
      });
    }
  }

  return await Problem.findAndCountAll({
    limit,
    offset,
    include: [
      {
        model: Picture,
      },
    ],
  });
};

const deleteOne = async (id) => {
  return await Problem.destroy({ where: { id } });
};
module.exports = {
  create,
  getAll,
  deleteOne,
};
