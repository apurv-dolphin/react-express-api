/* eslint-disable react/prop-types */
import { useState } from "react";
import Table from "react-bootstrap/Table";
import UseInformation from "./UseInformation";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import DeleteModal from "./DeleteModal";
import Button from "react-bootstrap/Button";

export default function UserTable(props) {
  const { userdata, getapicall } = props;
  const [show, setShow] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});

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
  return (
    <>
      <div className="btn-container mb-3">
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
          {userdata?.map((newdata, index) => (
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
        <UseInformation
          show={show}
          onHide={handleClose}
          userdata={editData}
          getapicall={getapicall}
        />
      )}
      {deleteShowModal && (
        <DeleteModal
          show={deleteShowModal}
          onHide={handleDeleteClose}
          userdata={deleteData}
          getapicall={getapicall}
        />
      )}
    </>
  );
}
