import { useState } from "react";
import Form from "react-bootstrap/Form";
import sendEmailToUser from "../service/mongo/sendEmailToUser";
import Button from "react-bootstrap/Button";

export default function EmailTemplate() {
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    subject: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({
      ...emailData,
      [name]: value,
    });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    console.log(emailData);
    const response = await sendEmailToUser(
      emailData?.name,
      emailData?.email,
      emailData?.subject
    );
    console.log(response);
  };
  return (
    <Form onSubmit={sendMail}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="enter your name"
          value={emailData?.name || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Email address</Form.Label>u
        <Form.Control
          name="email"
          type="email"
          placeholder="name@example.com"
          value={emailData?.email || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Example textarea</Form.Label>
        <Form.Control
          name="subject"
          as="textarea"
          rows={3}
          value={emailData?.subject || ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Button onClick={sendMail}>submit</Button>
    </Form>
  );
}
