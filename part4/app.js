const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

logger.info(`(MongoDB) Connecting to ${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("(MongoDB) Connected"))
  .catch((error) => logger.error("Error connecting to MongoDB", error.message));

app.use(express.json());
app.use(middleware.requestLogger);

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

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
