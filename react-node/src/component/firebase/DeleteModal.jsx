/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { UseUserData } from "../../contextAPI/firebase/firebaseContextAPI";
import deleteUserData from "../../service/firebaseAPI/deleteUser";

export default function DeleteModal(props) {
  const { getUseData } = UseUserData();

  const deleteUser = async () => {
    try {
      const response = await deleteUserData(props?.userdata?.id);
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
      getUseData();
      props.onHide();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      props.onHide();
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
