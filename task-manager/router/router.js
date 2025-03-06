let router = require("express").Router();
const UsersController = require("../controller/controller");

router.get("/", UsersController.getUsersAll);

module.exports = router;
