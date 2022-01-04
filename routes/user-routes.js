const router = require("express").Router();

const { auth } = require("../middlewares/auth-middleware.js");
const ckeckRole = require("../middlewares/check-role.js");
const UserController = require("./../controllers/user-controller.js");
const { body, check } = require("express-validator");

router.post(
  "/signup",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("must be at least 3 chars long"),
  UserController.signup
);
router.post("/login", UserController.login);
router.get("/", auth, ckeckRole("ADMIN"), UserController.getAll);
router.post("/refresh", UserController.refresh);
router.get("/activate/:link", UserController.activate);

module.exports = router;
