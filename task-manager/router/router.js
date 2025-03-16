let router = require("express").Router();
const UsersController = require("../controller/controller");
const auth = require("../middleware/token");

router.get("/", auth, UsersController.getUsersAll);
router.post("/add", UsersController.addUser);
router.post("/add-multiple", UsersController.addMultipleUsers);
router.get("/me", auth, UsersController.findUser);
router.delete("/me", auth, UsersController.deleteUser);
router.put("/me", auth, UsersController.updateUser);
router.post("/login", UsersController.loginUser);
router.post("/signup", UsersController.signUpUser);
router.post("/logout", auth, UsersController.logoutController);
router.post("/logoutAll", auth, UsersController.logoutAllController);

module.exports = router;
