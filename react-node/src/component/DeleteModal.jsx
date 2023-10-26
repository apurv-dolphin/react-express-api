/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import GlobalApi from "../service/GlobalBaseUrl";
import { toast } from "react-toastify";

export default function DeleteModal(props) {
  const deleteUser = async () => {
    try {
      const response = await GlobalApi.delete(`/users/${props?.userdata?.id}`);
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.getapicall();
      props.onHide();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Operation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure? You want to delete the user.</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={deleteUser} variant="danger">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
