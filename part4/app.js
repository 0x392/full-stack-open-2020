const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

logger.info(`(MongoDB) Connecting to ${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("(MongoDB) Connected"))
  .catch((error) => logger.error(error));

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
