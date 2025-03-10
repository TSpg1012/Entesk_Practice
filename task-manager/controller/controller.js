const Users = require("../model/model");

const getUsersAll = async (req, res) => {
  let allProducts = await Users.find({});
  res.send(allProducts);
};

const addUser = async (req, res) => {
  try {
    const newUser = new Users({
      name: req.body.name,
      age: req.body.age,
      id: req.body.id,
    });

    await newUser.save();
    res.status(201).send({ message: "User added successfully", newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res
      .status(400)
      .send({ message: "Error adding user", error: error.message });
  }
};

const addMultipleUsers = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length === 0) {
      return res.status(400).send({ message: "Invalid users data" });
    }

    const result = await Users.insertMany(req.body);
    res.status(201).send({ message: "Users added successfully", result });
  } catch (error) {
    console.error("Error adding users:", error);
    res
      .status(400)
      .send({ message: "Error adding users", error: error.message });
  }
};

const findUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const found = await Users.findOne({ id: userId });
    if (!found) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(found);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error finding user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const found = await Users.findOne({ id: userId });
    if (!found) {
      return res.status(404).send({ message: "User not found" });
    }

    await Users.findByIdAndDelete(found._id);

    res.status(200).send({ message: "User deleted successfully", user: found });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting user", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const found = await Users.findOne({ id: userId });
    if (!found) {
      return res.status(404).send({ message: "User not found" });
    }

    const updatedUser = await Users.findOneAndUpdate(
      { _id: found._id },
      req.body,
      { new: true }
    );

    res
      .status(200)
      .send({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting user", error: error.message });
  }
};

module.exports = {
  getUsersAll,
  addUser,
  addMultipleUsers,
  findUser,
  deleteUser,
  updateUser,
};
