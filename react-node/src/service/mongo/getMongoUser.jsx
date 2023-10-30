import GlobalApi from "../GlobalBaseUrl";

const getMongoUser = async () => {
  const response = await GlobalApi.get("/userinfo");
  const data = response.data;
  return data;
};

export default getMongoUser;
