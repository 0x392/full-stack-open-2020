const _ = require("lodash");
const Blog = require("../models/blog");
const User = require("../models/user");

const mockUsers = [
  {
    _id: "5f7e5ec41c6025465c49aada",
    blogs: ["5f7e5ec51c6025465c49aade", "5f7e5ec51c6025465c49aae0"],
    username: "mock_username_1",
    passwordHash:
      "$2b$10$AYl0VUmnM/5UcGfqppTMCee56msTwNF7FiWk6y2HOo6.Ihbwy54Xu",
    name: "mock_name_1",
    __v: 2,
  },
  {
    _id: "5f7e5ec41c6025465c49aadb",
    blogs: [
      "5f7e5ec41c6025465c49aadc",
      "5f7e5ec41c6025465c49aadd",
      "5f7e5ec51c6025465c49aadf",
    ],
    username: "mock_username_2",
    passwordHash:
      "$2b$10$x8t1l76Md2qCvZ8Z7eAi6ub2Z4CZfblqcOZ5GadT7P7p69JSuWM1W",
    name: "mock_name_2",
    __v: 3,
  },
];

const mockBlogs = [
  {
    _id: "5f7e5ec41c6025465c49aadc",
    likes: 2,
    title: "mock_title_1",
    author: "mock_user_1",
    url: "https://mockurl1.io/",
    user: "5f7e5ec41c6025465c49aadb",
    __v: 0,
  },
  {
    _id: "5f7e5ec41c6025465c49aadd",
    likes: 3,
    title: "mock_title_2",
    author: "mock_user_2",
    url: "https://mockurl2.io/",
    user: "5f7e5ec41c6025465c49aadb",
    __v: 0,
  },
  {
    _id: "5f7e5ec51c6025465c49aade",
    likes: 5,
    title: "mock_title_3",
    author: "mock_user_3",
    url: "https://mockurl3.io/",
    user: "5f7e5ec41c6025465c49aada",
    __v: 0,
  },
  {
    _id: "5f7e5ec51c6025465c49aadf",
    likes: 7,
    title: "mock_title_4",
    author: "mock_user_4",
    url: "https://mockurl4.io/",
    user: "5f7e5ec41c6025465c49aadb",
    __v: 0,
  },
  {
    _id: "5f7e5ec51c6025465c49aae0",
    likes: 11,
    title: "mock_title_5",
    author: "mock_user_5",
    url: "https://mockurl5.io/",
    user: "5f7e5ec41c6025465c49aada",
    __v: 0,
  },
];

const newUser = {
  username: "new_username",
  password: "new_password",
  name: "new_name",
};

const newBlog = {
  title: "new_title",
  author: "new_author",
  url: "https://newurl.io/",
  likes: 8,
};

const getUsersInDb = async () => {
  const userDocs = await User.find({});

  // Calls `toJSON` to remove `passwordHash`, `_id` and `__v` fields
  return userDocs.map((userDoc) => userDoc.toJSON());
};

const getBlogsInDb = async () => {
  const blogDocs = await Blog.find({});

  // Calling `toJSON` to remove `_id` and `__v` fields
  return blogDocs.map((blog) => blog.toJSON());
};

const getRandomUser = () => _.sample(mockUsers);

const getRandomBlog = () => _.sample(mockBlogs);

const getPassword = (user) =>
  `mock_password_${_.last(user.username.split("_"))}`;

module.exports = {
  mockUsers,
  mockBlogs,
  getUsersInDb,
  getBlogsInDb,
  getRandomUser,
  getRandomBlog,
  getPassword,
  newUser,
  newBlog,
};
