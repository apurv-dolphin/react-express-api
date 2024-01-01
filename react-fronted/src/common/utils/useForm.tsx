import { useState, useEffect } from "react";
import { notification } from "antd";
import sendEmailToUser from "../../service/mongo/sendEmailToUser";

export const useForm = (validate: any) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    attachment: null, // new field for image attachment
  });
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrors(validate(values));
    // Your URL for API
    if (Object.values(values).every((x) => x !== "")) {
      const response = await sendEmailToUser(
        values?.name,
        values?.email,
        values?.subject,
        values?.attachment
      );

      if (response.msg) {
        setValues({
          name: "",
          email: "",
          subject: "",
          attachment: null,
        });
        openNotificationWithIcon();
        setShouldSubmit(true);
        setLoading(false);
        setTimeout(() => {
          setShouldSubmit(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues({
        name: "",
        email: "",
        subject: "",
        attachment: null,
      });
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    event.persist();
    const { name, value, type, files } = event.target;

    if (type === "file") {
      // Handle file input separately
      const file = files && files.length ? files[0] : null;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: file,
      }));
    } else {
      // Handle regular input fields
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    shouldSubmit,
    loading,
  };
};
