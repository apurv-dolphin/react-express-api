import { useState, useEffect } from "react";
import { notification } from "antd";
import sendEmailToUser from "../../service/mongo/sendEmailToUser";

export const useForm = (validate: any) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    // Your url for API
    if (Object.values(values).every((x) => x !== "")) {
      const response = await sendEmailToUser(
        values?.name,
        values?.email,
        values?.subject
      );      
      if (response.msg) {
        setValues((values) => (values = { name: "", email: "", subject: "" }));
        openNotificationWithIcon();
        setShouldSubmit(true);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues((values) => (values = { name: "", email: "", subject: "" }));
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
