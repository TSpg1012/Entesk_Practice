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
    });

    await newUser.save();
    res.status(201).send({ message: "User added successfully", newUser });
  } catch {
    res.status(400).send({ message: "Error adding user", error });
  }
};

const addMultipleUsers = async (req, res) => {
  try {
    const usersArray = [
      {
        name: "Sabina",
        age: 23,
      },
      {
        name: "Aysun",
        age: 21,
      },
    ];
    const result = await Users.insertMany(usersArray);
    res.status(201).send({ message: "Users added successfully", result });
  } catch (error) {
    res.status(400).send({ message: "Error adding users", error });
  }
};

module.exports = {
  getUsersAll,
  addUser,
  addMultipleUsers,
};

//kodlara bax
