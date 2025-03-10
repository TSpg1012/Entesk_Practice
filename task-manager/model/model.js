const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "Age must be at least 18"],
    },
    id: {
      type: Number,
      required: [true, "ID is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  {
    collection: "users",
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password")) {
    // user.password = String(user.password);
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const Users = mongoose.model("users", userSchema);

// const hashPassword = async () => {
//   const password = "seid2004";
//   const hashedPassword = await bcrypt.hash(password, 8);

//   console.log(password);
//   console.log(hashedPassword);

//   const isMatch = await bcrypt.compare(password, hashedPassword);
//   console.log(isMatch);
// };

module.exports = Users;
