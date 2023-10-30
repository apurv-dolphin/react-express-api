import GlobalApi from "../GlobalBaseUrl";

const deleteMongoUser = async (id) => {
  const response = await GlobalApi.delete(`/userinfo/${id}`);
  const data = response.data.message;
  return data;
};

export default deleteMongoUser;
