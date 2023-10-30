import GlobalApi from "../GlobalBaseUrl";

const createUserData = async (userdata) => {
  const response = await GlobalApi.post("/api/users", userdata);
  const data = response.data.msg;
  return data;
};

export default createUserData;
