const jwt = require("jsonwebtoken");
const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.get("/", async (_request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

router.post("/", async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ message: "Token missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const blog = new Blog(request.body);
  if (!blog.title) {
    return response.status(400).json({ message: "Title missing " });
  }
  if (!blog.url) {
    return response.status(400).json({ message: "URL missing " });
  }

  const user = await User.findById(decodedToken.id);
  blog.likes = 0;
  blog.user = user;

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

router.put("/:id", async (request, response) => {
  const updatedBlog = request.body;

  const returnedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updatedBlog,
    { new: true }
  );

  response.json(returnedBlog.toJSON());
});

router.delete("/:id", async (request, response) => {
  /*
  if (!request.token) {
    return response.status(401).json({ message: "Token missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(decodedToken.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ message: "Only the creator can remove the blog" });
  }

  await blog.remove();
  user.blogs = user.blogs.filter(
    (blog) => blog.id.toString() !== request.params.id.toString()
  );
  await user.save();
  response.sendStatus(204);
  */

  // With using `populate(...)` in router of `GET /api/users`,
  // we don't need to handle `user.blogs`
  await Blog.findByIdAndDelete(request.params.id);
  response.sendStatus(204);
});

router.post("/:id/comments", async (request, response) => {
  const { comment } = request.body;

  const blog = await Blog.findById(request.params.id);
  blog.comments = blog.comments.concat(comment);
  await blog.save();

  response.sendStatus(201);
});

module.exports = router;
