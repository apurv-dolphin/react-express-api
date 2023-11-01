import GlobalApi from "../GlobalBaseUrl";

const deleteMongoUser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // Configure Axios to include the token in the request headers
  GlobalApi.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token?.token}`
    : "no token";
  const response = await GlobalApi.delete(`/userinfo/${id}`);
  const data = response.data.message;
  return data;
};

export default deleteMongoUser;
