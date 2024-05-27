import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // URL of the Node.js server
});

export default instance;
