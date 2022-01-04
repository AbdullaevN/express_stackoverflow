const { CREATE_SUCCESS, DELETE_SUCCESS } = require("../utils/consts");
const ErrorHandler = require("../utils/error-handler");
const ProblemService = require("./../services/problem-service.js");

const create = async (req, res, next) => {
  try {
    const { title, description, tag } = req.body;
    const { id } = req.user;
    let images;
    if (req.files) {
      images = req.files.images;
    }
    const { id: problemId } = await ProblemService.create(
      title,
      description,
      id,
      tag,
      images
    );
    res.json({ message: CREATE_SUCCESS, problemId });
  } catch (e) {
    next(e);
  }
};
const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, tag } = req.query;
    page = page || 1;
    limit = limit || 6;

    const offset = page * limit - limit;
    const problems = await ProblemService.getAll({ offset, page, q, limit });
    // console.log(req.query);
    res.json(problems);
  } catch (e) {
    // res.status(404).json({ message: "tag not found" });
    next(e);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    await ProblemService.deleteOne(id);
    res.json({ message: DELETE_SUCCESS });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  create,
  getAll,
  deleteOne,
};
