const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// modul user
const userSchema = new Schema({
  name: String,
  username: String,
  password: String,
  bio: String,
  photoProfile: String,
});
const user = mongoose.model("user", userSchema);

// modul room
const roomSchema = new Schema({
  name: String,
  topic: String,
  description: String,
  date: String,
  users: Array,
});
const room = mongoose.model("room", roomSchema);

// modul topic

const topicSchema = new Schema({
  name: String,
  count: Number,
});

const topic = mongoose.model("topic", topicSchema);

// modul pesan
const pesanSchema = new Schema({
  pesan: String,
  date: String,
  sender: String,
  roomId: String,
});
const pesan = mongoose.model("pesan", pesanSchema);

module.exports = {
  user,
  topic,
  room,
  pesan,
};
