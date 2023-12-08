import axios from "axios";

// Create a global Axios instance with a base URL
const GlobalApi = axios.create({
  baseURL: "http://localhost:7000/",
});

export default GlobalApi;
