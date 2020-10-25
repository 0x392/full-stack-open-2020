const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const User = require("../models/user");

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  if (user === null)
    return response.status(401).json({ message: "Couldn't find your account" });

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordCorrect)
    return response.status(401).json({ message: "Wrong password. Try again." });

  const userForToken = { id: user._id, username: user.username };
  const token = jwt.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .json({ name: user.name, username: user.username, token });
  response.sendStatus(200);
});

module.exports = router;
