const mongoose = require("mongoose");
const config = require("./config");
const User = require("../models/user");
const Blog = require("../models/blog");

(async function () {
  // Connect
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log("connected");

  // Clear db
  await User.deleteMany({});
  console.log("collection `users` cleared");

  await Blog.deleteMany({});
  console.log("collection `blogs` cleared");

  // Disconnect
  await mongoose.disconnect();
  console.log("disconnected");
})();
