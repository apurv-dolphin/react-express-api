import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import GlobalApi from "../service/GlobalBaseUrl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Authentication() {
  const [userName, setUserName] = useState({
    employee: "",
    token: new Date().getTime(),
  });
  const navigate = useNavigate();

  const goBackHome = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserName({ ...userName, [name]: value });
  };

  const handleTokenSubmit = () => {
    sessionStorage.setItem("token", JSON.stringify(userName));

    setTimeout(async () => {
      const data = JSON.parse(sessionStorage.getItem("token"));
      const token = { token: data?.token };
      const response = await GlobalApi.post("/authenticate", token);
      if (response?.status === 200) {
        navigate("/mongo");
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
        navigate("/");
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
      }
    }, 2000);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/mongo");
    }
  }, [navigate]);

  return (
    <Modal
      show
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={goBackHome}
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
        <Button onClick={goBackHome}>Close</Button>
        <Button onClick={handleTokenSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
