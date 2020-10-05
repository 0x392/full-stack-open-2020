const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const mongoose = require("mongoose");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe("Get all blogs", () => {
  // Exercise 4.8 - 1
  test("returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  // Exercise 4.8 - 2
  test("returned blogs are in JSON format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // Exercise 4.9
  test("returned blogs have property `id` and not `_id`", async () => {
    const blogsAtStart = await helper.getBlogsInDb();
    const firstBlog = blogsAtStart[0];
    expect(firstBlog.id).toBeDefined();
    expect(firstBlog._id).not.toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
