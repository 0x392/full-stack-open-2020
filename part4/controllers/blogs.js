const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.title) {
    return response.status(400).send({ error: "blog title missing" });
  }
  if (!body.url) {
    return response.status(400).send({ error: "blog url missing" });
  }

  try {
    const token = request.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken) {
      return response.status(401).send({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);
    const blog = new Blog({ ...body, user: user._id });
    const savedBlog = await blog.save();

    user.blogs = await user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    return next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken) {
      return response.status(401).send({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(400).send({ error: "invalid blog id" });
    if (blog.user.toString() !== decodedToken.id.toString())
      return response.status(401).send({ error: "wrong user" });
  } catch (error) {
    return next(error);
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const token = request.token;
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken) {
      return response.status(401).send({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) return response.status(400).send({ error: "invalid blog id" });
    if (blog.user.toString() !== decodedToken.id.toString())
      return response.status(401).send({ error: "wrong user" });
  } catch (error) {
    return next(error);
  }

  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
