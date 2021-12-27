const { Op } = require("sequelize");
const { Problem, Picture } = require("./../models");

const ErrorHandler = require("./../utils/error-handler.js");
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

module.exports = {
  create,
  getAll,
};
