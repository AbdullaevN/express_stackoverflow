const router = require("express").Router();

const { auth } = require("../middlewares/auth-middleware.js");
const ProblemController = require("./../controllers/problem-controller.js");

router.post("/create", auth, ProblemController.create);
router.get("/", ProblemController.getAll);

module.exports = router;
