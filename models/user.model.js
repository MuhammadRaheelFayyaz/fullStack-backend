const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  delete: {
    type: Boolean,
    default: false
  }
});

userSchema.statics.getUserById = async id =>
  await mongoose.model("Users").findById(id);

userSchema.statics.getUserByName = async ({ name }) =>
  await mongoose.model("Users").findOne({ name });

userSchema.statics.getAllUser = async () =>
  List(await mongoose.model("Users").find());

userSchema.statics.getDeletedUsers = async () =>
  List(await mongoose.model("Users").find({ delete: true }));

userSchema.statics.getUnDeletedUsers = async () =>
  List(await mongoose.model("Users").find({ delete: false }));

userSchema.statics.deleteUser = async id =>
  await mongoose
    .model("Users")
    .findByIdAndUpdate(id, { delete: true }, { new: true });

module.exports = mongoose.model("Users", userSchema);

const List = list =>
  list.map(user => ({
    id: user._id,
    name: user.name,
    delete: user.delete
  }));
