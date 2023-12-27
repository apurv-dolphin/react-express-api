import GlobalApi from "../GlobalBaseUrl";

const sendEmailToUser = async (name, email, subject) => {
  const response = await GlobalApi.post("/userinfo/email-send", {
    name,
    email,
    subject,
  });
  const data = response.data;
  return data;
};

export default sendEmailToUser;
