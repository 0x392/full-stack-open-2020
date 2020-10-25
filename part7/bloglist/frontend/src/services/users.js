import axios from "axios";

const login = async (credential) => {
  const response = await axios.post("/api/login", credential);
  return response.data; // return { name, username, token }
};

const getAll = async () => {
  const response = await axios.get("/api/users");
  return response.data;
};

export default { login, getAll };
