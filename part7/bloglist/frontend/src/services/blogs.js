import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => (token = newToken);

const getAuthHeader = () => `bearer ${token}`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlogObject) => {
  const config = { headers: { Authorization: getAuthHeader() } };
  const response = await axios.post(baseUrl, newBlogObject, config);
  return response.data;
};

const remove = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`);
};

const like = async ({ id, title, author, url, likes, user }) => {
  const updatedBlog = {
    title,
    author,
    url,
    likes: likes + 1,
    user: user.id,
  };
  return await axios.put(`${baseUrl}/${id}`, updatedBlog);
};

export default { setToken, getAll, create, remove, like };
