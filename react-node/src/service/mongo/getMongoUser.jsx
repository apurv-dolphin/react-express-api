import GlobalApi from "../GlobalBaseUrl";

const getMongoUser = async () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // Configure Axios to include the token in the request headers
  GlobalApi.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token?.token}`
    : "no token";

  const response = await GlobalApi.get("/userinfo");
  const data = response.data;
  return data;
};

export default getMongoUser;
