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
    for (let i = 0; i < blogsAtStart.length; i++) {
      let blog = blogsAtStart[i];
      expect(blog.id).toBeDefined();
      expect(blog._id).not.toBeDefined();
    }
  });
});

describe("Create a new blog", () => {
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
  test("`like` property will default to 0 if it's missing from the request", async () => {
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

afterAll(() => {
  mongoose.connection.close();
});