/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { UseMongoUserData } from "../../contextAPI/mongo/mongoContextAPI";
import editMongoUser from "../../service/mongo/editMongoUser";
import createMongoUser from "../../service/mongo/createMongoUser";
import ImageDisplay from "./ImageDisplay";

export default function EmployeeInformation(props) {
  const { getUseMongoData } = UseMongoUserData();
  const [editData, setEditData] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    technology: "",
    email: "",
    phone: "",
    photoUrl: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditData({
      ...editData,
      photoUrl: file,
    });
  };
  const updateUserData = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstname", editData?.firstname);
    formDataToSend.append("lastname", editData?.lastname);
    formDataToSend.append("technology", editData?.technology);
    formDataToSend.append("email", editData?.email);
    formDataToSend.append("phone", editData?.phone);
    formDataToSend.append("photoUrl", editData?.photoUrl);
    try {
      const response = await editMongoUser(editData?._id, formDataToSend);
      toast.success(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getUseMongoData();
      props.onHide();
    } catch (error) {
      console.log("error:", error);
      if (error?.response?.status === 403) {
        toast.error("You are unauthorized", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  const createUser = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("firstname", editData?.firstname);
    formDataToSend.append("lastname", editData?.lastname);
    formDataToSend.append("technology", editData?.technology);
    formDataToSend.append("email", editData?.email);
    formDataToSend.append("phone", editData?.phone);
    formDataToSend.append("photoUrl", editData?.photoUrl);
    try {
      const response = await createMongoUser(formDataToSend);
      toast.success(response, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      getUseMongoData();
      props.onHide();
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 403) {
        toast.error("You are unauthorized", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  useEffect(() => {
    setEditData({
      _id: props.userdata?._id,
      firstname: props.userdata?.firstname,
      lastname: props.userdata?.lastname,
      technology: props.userdata?.technology,
      email: props.userdata?.email,
      phone: props.userdata?.phone,
      photoUrl: props.userdata?.photoUrl,
    });
  }, [props.userdata]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span style={{ display: "flex", justifyContent: "center" }}>
          <ImageDisplay src={editData?.photoUrl} />
        </span>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your first name"
              autoFocus
              name="firstname"
              value={editData?.firstname || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your last name"
              autoFocus
              name="lastname"
              value={editData?.lastname || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Technology</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your technology"
              autoFocus
              name="technology"
              value={editData?.technology || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              autoFocus
              name="email"
              value={editData?.email || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="1234567895"
              name="phone"
              autoFocus
              value={editData?.phone || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
            <Form.Label>Profile Image</Form.Label>
            <Form.Control
              type="file"
              name="photo"
              autoFocus
              onChange={handleFileChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button
          variant="primary"
          onClick={props.userdata === null ? createUser : updateUserData}
        >
          {props.userdata === null ? "Submit" : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
