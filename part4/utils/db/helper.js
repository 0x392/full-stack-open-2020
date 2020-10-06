const mongoose = require("mongoose");
const config = require("../config");
const Blog = require("../../models/blog");
const initData = require("./init_blog_data");
const axios = require("axios");

const apiEndpoint = (context) =>
  `http://localhost:${config.PORT}/api/${context}`;

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
    await Blog.deleteMany({});
    console.log("collection `blogs` cleared");
  },
};

const model = {
  data: initData,
  saveBlogs: async function () {
    for (let i = 0; i < this.data.length; i++) {
      const blog = this.data[i];
      const response = await axios.post(apiEndpoint("blogs"), { ...blog });
      blog.id = response.data.id;
      console.log(`blog \`${blog.title}\` saved`);
    }
  },
};

module.exports = { db, model };
