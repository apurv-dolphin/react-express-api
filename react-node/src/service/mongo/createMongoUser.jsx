import GlobalApi from "../GlobalBaseUrl";

const createMongoUser = async (userdata) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // Configure Axios to include the token in the request headers
  GlobalApi.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token?.token}`
    : "no token";

  const response = await GlobalApi.post("/userinfo", userdata);
  const data = response.data.message;
  return data;
};

export default createMongoUser;
