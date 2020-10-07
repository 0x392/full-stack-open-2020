const _ = require("lodash");
const mongoose = require("mongoose");
const config = require("../config");
const User = require("../../models/user");
const Blog = require("../../models/blog");
const initData = require("./init_data");
const axios = require("axios");
// // const blog = require("../../models/blog");

const apiEndpoint = (endpoint) =>
  `http://localhost:${config.PORT}/api/${endpoint}`;

const db = {
  connect: async function () {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("connected to MongoDB");
  },
  disconnect: async function () {
    await mongoose.disconnect();
    console.log("disconnected");
  },
  clear: async function () {
    await User.deleteMany({});
    console.log("collection `users` cleared");
    await Blog.deleteMany({});
    console.log("collection `blogs` cleared");
  },
};

const model = {
  data: initData,
  saveUsers: async function () {
    for (let i = 0; i < this.data.users.length; i++) {
      const user = this.data.users[i];
      const newUser = _.pick(user, ["username", "password", "name"]);
      const response = await axios.post(apiEndpoint("users"), newUser);
      console.log(`user \`${user.name}\` saved`);
    }
  },
  saveBlogs: async function () {
    for (let i = 0; i < this.data.blogs.length; i++) {
      const blog = this.data.blogs[i];
      const newBlog = _.pick(blog, ["title", "author", "url", "likes"]);
      const response = await axios.post(apiEndpoint("blogs"), newBlog);
      console.log(`blog \`${blog.title}\` saved`);
    }
  },
};

module.exports = { db, model };
