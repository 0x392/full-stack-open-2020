const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogModels = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogModels.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Getting all blogs", () => {
  // Exercise 4.8 - 1
  test("returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  // Exercise 4.8 - 2
  test("returns blogs in JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // Exercise 4.9
  test("returns blogs with property `id` and without `_id`", async () => {
    const blogsAtStart = await helper.getBlogsInDb();
    for (let i = 0; i < blogsAtStart.length; i++) {
      let blog = blogsAtStart[i];
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    }
  });
});

describe("Creating a new blog", () => {
  // Exercise 4.10
  test("successfully with a valid data", async () => {
    const newBlog = {
      title: "What's Happened, Happened",
      author: "Neil",
      url: "https://tenetquotes.com/neil",
      likes: 11,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.getBlogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).toContain("What's Happened, Happened");
  });

  // Exercise 4.11
  test("if `like` property is missing from the request, it defaults to 0", async () => {
    const newBlog = {
      title: "What's Happened, Happened",
      author: "Neil",
      url: "https://tenetquotes.com/neil",
    };

    const response = await api.post("/api/blogs").send(newBlog);
    expect(response.body.likes).toBe(0);
  });

  // Exercise 4.12 - 1
  test("responds with 400 if the `title` property is missing", async () => {
    const newBlog = {
      author: "Neil",
      url: "https://tenetquotes.com/neil",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  // Exercise 4.12 - 2
  test("responds with 400 if the `url` property is missing", async () => {
    const newBlog = {
      title: "What's Happened, Happened",
      author: "Neil",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

describe("Deletion of a blog", () => {
  test("succeeds with status code 204 when `id` is valid", async () => {
    const blogAtStart = await helper.getBlogsInDb();
    const blogToDelete = blogAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.getBlogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((blog) => blog.title);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe.only("Update of a blog", () => {
  test("succeeds with status code 200 for a valid request", async () => {
    const blogAtStart = await helper.getBlogsInDb();
    const blogToUpdate = blogAtStart[0];
    blogToUpdate.title = "I'll See You in the Beginning";

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const updatedBlog = await Blog.findById(blogToUpdate.id);
    expect(updatedBlog).toBe(blogToUpdate.title);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
