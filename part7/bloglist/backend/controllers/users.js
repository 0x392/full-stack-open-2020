const router = require("express").Router();
const User = require("../models/user");

router.get("/", async (_request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users);
});

module.exports = router;
