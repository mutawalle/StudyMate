const models = require("./Models");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// set up multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now().toString() + "-" + file.originalname;
    cb(null, name);
  },
});

exports.uploadPhotoProfile = multer({ storage: storage }).single(
  "photoProfile"
);

exports.buatPhotoProfile = (req, res) => {
  // update user photo profile
  console.log(req.file.path);
  res.send(req.file.path).status(200);
};

// validator
exports.validasiUser = [
  body("new_username").custom((value) => {
    return models.user.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("Username sudah terdaftar");
      }
    });
  }),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password minimal 8 karakter"),
];

// create user
exports.buatUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.send(400).send({ errors: errors.array() });
  }
  const password = await bcrypt.hash(req.body.password, 10);

  const user = new models.user({
    name: req.body.name,
    username: req.body.username,
    bio: "",
    password: password,
    photoProfile: "-",
  });

  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch {
    res.status(400).send(err);
  }
};

// login user
exports.loginUser = async (req, res) => {
  // cek apakah akun ada berdasar email dan password benar
  const akunAda = await models.user.findOne({ username: req.query.username });
  if (akunAda) {
    const passwordBenar = await bcrypt.compare(
      req.query.password,
      akunAda.password
    );
    if (passwordBenar) {
      res.send(akunAda);
    } else {
      res.status(400).send({ msg: "Username or password is wrong!" });
    }
  } else {
    res.status(400).send({ msg: "Username or password is wrong!" });
  }
};

// get user
exports.getUser = async (req, res) => {
  const user = await models.user.findOne({ username: req.query.username });
  res.status(200).send(user);
};

//edit profile
exports.editProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ errors: errors.array() });
  } else {
    const user = await models.user.findOneAndUpdate(
      { _id: req.body._id },
      {
        name: req.body.name,
        username: req.body.new_username,
        bio: req.body.bio,
      },
      { new: true }
    );
    await models.pesan.updateMany(
      { sender: req.body.old_username },
      { sender: req.body.new_username }
    );
    await models.room.updateMany(
      {},
      { $set: { "users.$[user]": req.body.new_username } },
      { arrayFilters: [{ user: req.body.old_username }] }
    );
    res.status(200).send(user);
  }
};

// create room
exports.createRoom = async (req, res) => {
  const time = new Date().toString();
  const room = new models.room({
    name: req.body.name,
    topic: req.body.topic,
    description: req.body.description,
    date: time.substring(4, 24),
    users: [req.body.user],
  });

  const topic = await models.topic.findOne({ name: req.body.topic });
  if (topic) {
    await models.topic.findOneAndUpdate(
      { name: req.body.topic },
      { count: topic.count + 1 },
      { new: true }
    );
  } else {
    const topic = new models.topic({
      name: req.body.topic,
      count: 1,
    });
    await topic.save();
  }

  try {
    const saveRoom = await room.save();
    res.status(200).send(saveRoom);
  } catch {
    res.status(400).send(err);
  }
};

// update room
exports.updateRoom = async (req, res) => {
  const room = await models.room.findOneAndUpdate(
    { _id: req.body._id },
    { users: req.body.users },
    { new: true }
  );
  res.status(200).send(room);
};

// get rooms
exports.getRooms = async (req, res) => {
  const room = await models.room.find();
  res.status(200).send(room);
};

// get rooms by host
exports.getRoomsByHost = async (req, res) => {
  const room = await models.room.find({ "users.0": req.query.hostname });
  res.status(200).send(room);
};

// get room
exports.getRoom = async (req, res) => {
  const room = await models.room.findOne({ _id: req.query._id });
  res.status(200).send(room);
};

// get topics
exports.getTopics = async (req, res) => {
  const topics = await models.topic.find();
  res.status(200).send(topics);
};

// create pesan
exports.createPesan = async (req, res) => {
  const time = new Date().toString();
  const pesan = new models.pesan({
    pesan: req.body.pesan,
    date: time.substring(4, 24),
    sender: req.body.sender,
    roomId: req.body.roomId,
  });

  try {
    const savePesan = await pesan.save();
    res.status(200).send(savePesan);
  } catch {
    res.status(400).send(err);
  }
};

// get pesan
exports.getPesan = async (req, res) => {
  const pesan = await models.pesan.find({ roomId: req.query.room });
  res.status(200).send(pesan);
};

// get last pesan
exports.getLastPesan = async (req, res) => {
  const pesan = await models.pesan.find();
  res.send(pesan);
};
