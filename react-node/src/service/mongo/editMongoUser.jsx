import GlobalApi from "../GlobalBaseUrl";

const editMongoUser = async (id, userdata) => {
  const response = await GlobalApi.put(`/userinfo/${id}`, userdata);
  const data = response.data.message;
  return data;
};

export default editMongoUser;
