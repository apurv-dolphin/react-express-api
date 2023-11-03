import GlobalApi from "../GlobalBaseUrl";

const editMongoUser = async (id, userdata) => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  // Configure Axios to include the token in the request headers
  GlobalApi.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token?.token}`
    : "no token";
  const response = await GlobalApi.put(`/userinfo/${id}`, userdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  const data = response.data.message;
  return data;
};

export default editMongoUser;
