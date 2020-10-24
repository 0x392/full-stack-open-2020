const _ = require("lodash");
const mongoose = require("mongoose");
const config = require("../config");
const User = require("../../models/user");
const Blog = require("../../models/blog");
const initData = require("./init_data");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const utils = {
  apiEndpoint: function (endpoint) {
    return `http://localhost:${config.PORT}/api/${endpoint}`;
  },
  credentialString: function (user) {
    return `bearer ${user.token}`;
  },
};

const db = {
  connect: async function () {
    console.log(config);
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
  dumpData: function (filename) {
    const savePath = path.join(__dirname, filename);
    fs.writeFileSync(savePath, JSON.stringify(this.data, null, 2));
    console.log(`${filename} saved`);
  },
  saveUsers: async function () {
    const promiseArray = this.data.users.map((user) => {
      const newUser = _.pick(user, ["username", "password", "name"]);
      return axios.post(utils.apiEndpoint("users"), newUser);
    });

    const responses = await Promise.all(promiseArray);
    responses.forEach(({ data }, i) => {
      this.data.users[i].id = data.id;
      console.log(`user "${data.name}" saved`);
    });

    console.log("all users saved");
  },
  loginAndGetTokens: async function () {
    const promiseArray = this.data.users.map((user) => {
      const loginInfo = _.pick(user, ["username", "password"]);
      return axios.post(utils.apiEndpoint("login"), loginInfo);
    });

    const responses = await Promise.all(promiseArray);
    responses.forEach(({ data }, i) => (this.data.users[i].token = data.token));

    console.log("all tokens extracted");
  },
  // Note that we can't use `Promise.all` here, because there are more than one
  // requests trying to update the user document; therefore we use for loop
  // here, making requests sequentially
  saveBlogs: async function () {
    for (let i = 0; i < this.data.blogs.length; i++) {
      const blog = this.data.blogs[i];
      const newBlog = _.pick(blog, ["title", "author", "url", "likes"]);
      const randomUser = _.sample(this.data.users);
      const { data } = await axios.post(utils.apiEndpoint("blogs"), newBlog, {
        headers: { Authorization: utils.credentialString(randomUser) },
      });
      this.data.blogs[i].id = data.id;
      this.data.blogs[i].user = data.user;
      console.log(`blog \`${data.title}\` saved`);
    }

    console.log("all blogs saved");
  },
};

module.exports = { db, model };
