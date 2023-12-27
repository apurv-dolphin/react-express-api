import GlobalApi from "../GlobalBaseUrl";

const deleteUserData = async (id) => {
  const response = await GlobalApi.delete(`/api/users/${id}`);
  const data = response.data.msg;
  return data;
};

export default deleteUserData;
