import axios from "axios";

const login = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data; // return { name, token, username }
};

const getAll = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

export default { login, getAll };
