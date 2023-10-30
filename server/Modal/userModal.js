const mongoose = require("mongoose");

const UserInfoSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  technology: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
});

const User = mongoose.model("USERINFORMATION", UserInfoSchema);

module.exports = User;
