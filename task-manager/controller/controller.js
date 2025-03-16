const Users = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUsersAll = async (req, res) => {
  try {
    const {
      limit = 10,
      skip = 0,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    const order = sortOrder === "desc" ? -1 : 1;

    const validSortFields = ["name", "age", "email", "id"];

    if (!validSortFields.includes(sortBy)) {
      return res.status(400).send({ message: "Invalid sort field" });
    }

    const users = await Users.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ [sortBy]: order });

    res.status(200).send(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching users", error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const newUser = new Users({
      name: req.body.name,
      age: req.body.age,
      id: req.body.id,
      password: req.body.password,
      email: req.body.email,
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
    const user = req.user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // const userData = user.toObject();
    // delete userData.password;
    // delete userData.tokens;

    res.status(200).send(user);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching user", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    await Users.findByIdAndDelete(user._id);

    res.status(200).send({ message: "Your account has been deleted" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting account", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = req.user;

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    Object.keys(updates).forEach((key) => (user[key] = updates[key]));
    await user.save();

    res.status(200).send({ message: "Profile updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating profile", error: error.message });
  }
};

const signUpUser = async (req, res) => {
  try {
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 8);

    const newUser = new Users({
      name: req.body.name,
      age: req.body.age,
      id: Number(req.body.id),
      password: hashedPassword,
      email: req.body.email,
    });

    await newUser.save();
    const token = await newUser.generateAuthToken();

    res
      .status(201)
      .json({ message: "New registered successfully", user: newUser, token });
  } catch (error) {
    console.error("Error signing up user:", error);
    res
      .status(500)
      .json({ message: "Error signing up user", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or password" });
    }

    const token = await user.generateAuthToken();

    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const logoutController = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).send({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, "my_secret_key");

    const user = await Users.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.tokens = user.tokens.filter((userToken) => userToken.token !== token);

    await user.save();

    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

const logoutAllController = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).send({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, "my_secret_key");

    const user = await Users.findOne({ _id: decoded._id });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.tokens = [];

    await user.save();

    res
      .status(200)
      .send({ message: "Logged out from all devices successfully" });
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

module.exports = {
  getUsersAll,
  addUser,
  addMultipleUsers,
  findUser,
  deleteUser,
  updateUser,
  loginUser,
  signUpUser,
  logoutController,
  logoutAllController,
};
