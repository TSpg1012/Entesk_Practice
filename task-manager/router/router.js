let router = require("express").Router();
const UsersController = require("../controller/controller");

router.get("/", UsersController.getUsersAll);
router.post("/add", UsersController.addUser);
router.post("/add-multiple", UsersController.addMultipleUsers);
router.get("/:id", UsersController.findUser);
router.delete("/:id", UsersController.deleteUser);
router.put("/:id", UsersController.updateUser);
router.post("/login/:id/:password", UsersController.loginUser);

module.exports = router;
