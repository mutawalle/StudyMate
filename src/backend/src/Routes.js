const express = require("express");
const app = express();
const Controllers = require("./Controllers");

// user
app.post("/register", Controllers.validasiUser[0],Controllers.validasiUser[1], Controllers.buatUser);
app.get("/login", Controllers.loginUser);
app.get("/get-user", Controllers.getUser);
app.post("/edit-profile", Controllers.validasiUser[0], Controllers.editProfile);
app.post('/create-profile', Controllers.uploadPhotoProfile, Controllers.buatPhotoProfile)

// room
app.post("/create-room", Controllers.createRoom);
app.get("/get-rooms", Controllers.getRooms);
app.get("/get-rooms-by-host", Controllers.getRoomsByHost);
app.post("/update-room", Controllers.updateRoom);
app.get("/get-room", Controllers.getRoom);

// topic
app.get("/get-topics", Controllers.getTopics);

// pesan
app.post("/create-pesan", Controllers.createPesan);
app.get("/get-pesan", Controllers.getPesan);
app.get("/get-last-pesan", Controllers.getLastPesan);

module.exports = app;
