import GlobalApi from "../GlobalBaseUrl";

const createMongoUser = async (userdata) => {
  const response = await GlobalApi.post("/userinfo", userdata);
  const data = response.data.message;
  return data;
};

export default createMongoUser;
