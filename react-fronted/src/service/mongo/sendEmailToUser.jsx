import GlobalApi from "../GlobalBaseUrl";

const sendEmailToUser = async (name, email, subject, attachment) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("subject", subject);
  formData.append("attachment", attachment);
  const response = await GlobalApi.post("/userinfo/email-send", formData);
  const data = response.data;
  return data;
};

export default sendEmailToUser;
