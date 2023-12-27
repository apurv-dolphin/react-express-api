import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import GlobalApi from "../../service/GlobalBaseUrl";

export default function Authentication(props: { show: any; onHide: any }) {
  const { show, onHide } = props;
  const [userName, setUserName] = useState({
    employee: "",
    token: new Date().getTime(),
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUserName({ ...userName, [name]: value });
  };

  const handleTokenSubmit = () => {
    sessionStorage.setItem("token", JSON.stringify(userName));

    setTimeout(async () => {
      let token;
      const tokenString = sessionStorage.getItem("token");
      if (tokenString !== null) {
        const data = JSON.parse(tokenString);
        token = { token: data?.token };
      }
      const response = await GlobalApi.post("/authenticate", token);
      if (response?.status === 200) {
        onHide();
        toast.success("You are authenticated", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("You don't have to access to use the data", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onHide();
      }
    }, 2000);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      onHide();
    }
  }, [onHide]);

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Get Access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter you name"
              autoFocus
              name="employee"
              value={userName?.employee || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={handleTokenSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
