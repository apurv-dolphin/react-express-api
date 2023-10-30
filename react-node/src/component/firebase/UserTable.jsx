/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import UseInformation from "./UseInformation";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import Button from "react-bootstrap/Button";
import { UseUserData } from "../../contextAPI/firebase/firebaseContextAPI";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
  const { userData, getUseData } = UseUserData();
  const [show, setShow] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setEditData(data);
    setShow(true);
  };

  const handleDeleteClose = () => setDeleteShowModal(false);
  const handleDeleteShow = (data) => {
    setDeleteData(data);
    setDeleteShowModal(true);
  };

  const prevTab = () => {
    navigate("/");
  };

  useEffect(() => {
    getUseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="btn-container mb-3 ">
        <Button variant="primary" onClick={prevTab}>
          Back
        </Button>
        <h2>User Information Table</h2>
        <Button variant="primary" onClick={() => handleShow(null)}>
          Create
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData?.map((newdata, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{newdata?.firstname}</td>
              <td>{newdata?.lastname}</td>
              <td>{newdata?.city}</td>
              <td>{newdata?.email}</td>
              <td>{newdata?.phone}</td>
              <td>
                <span className="action-btn">
                  <BiEdit onClick={() => handleShow(newdata)} />
                  <RiDeleteBin2Fill onClick={() => handleDeleteShow(newdata)} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {show && (
        <UseInformation show={show} onHide={handleClose} userdata={editData} />
      )}
      {deleteShowModal && (
        <DeleteModal
          show={deleteShowModal}
          onHide={handleDeleteClose}
          userdata={deleteData}
        />
      )}
    </>
  );
}
