const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { body } = request;
  if (body.title === undefined || body.url === undefined)
    return response.status(400).end();

  const blog = new Blog(body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { body } = request;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
