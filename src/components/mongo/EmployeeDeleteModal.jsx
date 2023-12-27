/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import deleteMongoUser from "../../service/mongo/deleteMongoUser";
import { UseMongoUserData } from "../../contextAPI/mongo/mongoContextAPI";

export default function EmployeeDeleteModal(props) {
  const { getUseMongoData } = UseMongoUserData();
  const deleteUser = async () => {
    try {
      const response = await deleteMongoUser(props?.userdata?._id);
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
      } else {
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
