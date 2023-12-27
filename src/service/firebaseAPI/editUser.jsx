import GlobalApi from "../GlobalBaseUrl";

const editUser = async (id, userdata) => {
  const response = await GlobalApi.put(`/api/users/${id}`, userdata);
  const data = response.data.msg;
  return data;
};

export default editUser;
