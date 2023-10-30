import GlobalApi from "../GlobalBaseUrl";

const getUser = async () => {
  const response = await GlobalApi.get("/api/users");
  const data = response.data;
  return data;
};

export default getUser;
