const _ = require("lodash");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");
const Blog = require("../models/blog");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const api = supertest(app);

describe("Creating a new user while there are some users in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userDocs = helper.mockUsers.map((mockUser) => new User(mockUser));
    const promiseArray = userDocs.map((userDoc) => userDoc.save());
    await Promise.all(promiseArray);
  });

  test("succeeds with valid data", async () => {
    const usersAtStart = await helper.getUsersInDb();

    await api
      .post("/api/users")
      .send(helper.newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.getUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(helper.newUser.username);
  });

  test("fails with status code 400 and error message if `username` is not given", async () => {
    const newUser = _.clone(helper.newUser);
    delete newUser.username;

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("`username` is required");
  });

  test("fails with status code 400 and error message if `username` is less than 3 characters", async () => {
    const newUser = _.clone(helper.newUser);
    newUser.username = "a";

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("username");
    expect(response.body.error).toContain(
      "shorter than the minimum allowed length (3)"
    );
  });

  test("fails with status code 400 and error message if `password` is not given", async () => {
    const newUser = _.clone(helper.newUser);
    delete newUser.password;

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("`password` is required");
  });

  test("fails with status code 400 and error message if `password` is less than 3 characters", async () => {
    const newUser = _.clone(helper.newUser);
    newUser.password = "a";

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("password");
    expect(response.body.error).toContain(
      "shorter than the minimum allowed length (3)"
    );
  });

  test("fails with status code 400 and error message if `username` has already been taken", async () => {
    const usersAtStart = await helper.getUsersInDb();

    const newUser = {
      username: helper.getRandomUser().username,
      password: "new_password",
      name: "new_name",
    };

    const response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(response.body.error).toContain("`username` to be unique");

    const usersAtEnd = await helper.getUsersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

describe("There are some blog posts and users in db", () => {
  beforeEach(async () => {
    let promiseArray;

    await User.deleteMany({});

    const userDocs = helper.mockUsers.map((mockUser) => new User(mockUser));
    promiseArray = userDocs.map((userDoc) => userDoc.save());
    await Promise.all(promiseArray);

    await Blog.deleteMany({});

    const blogDocs = helper.mockBlogs.map((mockBlog) => new Blog(mockBlog));
    promiseArray = blogDocs.map((blogDoc) => blogDoc.save());
    await Promise.all(promiseArray);
  });

  describe("Getting all blog posts", () => {
    // Exercise 4.8 - 1
    test("returns correct amount of blog posts", async () => {
      const response = await api.get("/api/blogs");
      expect(response.body).toHaveLength(helper.mockBlogs.length);
    });

    // Exercise 4.8 - 2
    test("returns blog posts in JSON", async () => {
      await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    // Exercise 4.9
    test("returns blog posts with property `id` but without `_id`", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      response.body.forEach((blog) => {
        expect(blog.id).toBeDefined();
        expect(blog._id).not.toBeDefined();
      });
    });
  });

  describe("Creating a new blog post", () => {
    // Exercise 4.10 and 4.22
    test("succeeds with a valid data", async () => {
      const randomUser = helper.getRandomUser();

      // Login
      let response = await api.post("/api/login").send({
        username: randomUser.username,
        password: helper.getPassword(randomUser),
      });

      const token = response.body.token;
      const decodedToken = await jwt.verify(token, process.env.SECRET);

      // Create a new blog post
      response = await api
        .post("/api/blogs")
        .send(helper.newBlog)
        .set("Authorization", `bearer ${token}`);
      const savedPost = response.body;

      expect(savedPost.user.toString()).toBe(decodedToken.id);

      const blogsAtEnd = await helper.getBlogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.mockBlogs.length + 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).toContain(helper.newBlog.title);
    });

    // Exercise 4.11 and 4.20
    test("if `like` property is missing from the request, it defaults to 0", async () => {
      const randomUser = helper.getRandomUser();

      // Login
      let response = await api.post("/api/login").send({
        username: randomUser.username,
        password: helper.getPassword(randomUser),
      });

      const token = response.body.token;

      const newBlogWithoutLikes = _.clone(helper.newBlog);
      delete newBlogWithoutLikes.likes;

      response = await api
        .post("/api/blogs")
        .send(newBlogWithoutLikes)
        .set("Authorization", `bearer ${token}`);

      expect(response.body.likes).toBe(0);
    });

    // Exercise 4.12 - 1
    test("responds with 400 if the `title` property is missing", async () => {
      const newBlog = _.clone(helper.newBlog);
      delete newBlog.title;

      await api.post("/api/blogs").send(newBlog).expect(400);
    });

    // Exercise 4.12 - 2
    test("responds with 400 if the `url` property is missing", async () => {
      const newBlog = _.clone(helper.newBlog);
      delete newBlog.url;

      await api.post("/api/blogs").send(newBlog).expect(400);
    });
  });

  describe("Deleting a blog post", () => {
    test("succeeds with status code 204 with a valid `id`", async () => {
      const blogsAtStart = await helper.getBlogsInDb();

      const blogToDelete = helper.getRandomBlog();
      const user = await User.findById(blogToDelete.user);

      // Login
      let response = await api.post("/api/login").send({
        username: user.username,
        password: helper.getPassword(user),
      });

      const token = response.body.token;

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set("Authorization", `bearer ${token}`)
        .expect(204);

      const blogsAtEnd = await helper.getBlogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const titles = blogsAtEnd.map((blog) => blog.title);
      expect(titles).not.toContain(blogToDelete.title);
    });
  });

  describe("Updating a blog post", () => {
    test("succeeds with status code 200 for a valid request", async () => {
      const blogsAtStart = await helper.getBlogsInDb();

      const blogToUpdate = helper.getRandomBlog();
      const user = await User.findById(blogToUpdate.user);

      // Login
      let response = await api.post("/api/login").send({
        username: user.username,
        password: helper.getPassword(user),
      });

      const token = response.body.token;

      blogToUpdate.title = "update_title";
      blogToUpdate.author = "update_author";
      blogToUpdate.url = "update_url";
      blogToUpdate.likes = blogToUpdate.likes + 100;

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(blogToUpdate)
        .set("Authorization", `bearer ${token}`)
        .expect(200);

      const blogsAtEnd = await helper.getBlogsInDb();
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

      const updatedBlog = await Blog.findById(blogToUpdate._id);
      const fields = ["title", "author", "url", "likes"];
      expect(_.pick(updatedBlog, fields)).toEqual(_.pick(blogToUpdate, fields));
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
