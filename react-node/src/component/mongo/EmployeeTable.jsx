/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { UseMongoUserData } from "../../contextAPI/mongo/mongoContextAPI";
import EmployeeInformation from "./EmployeeInformation";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import { useNavigate } from "react-router-dom";

export default function EmployeeTable() {
  const { userMongoData, getUseMongoData } = UseMongoUserData();
  const [employeeName, setEmployeeName] = useState("");
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
    const Name = JSON.parse(localStorage.getItem("token"));
    setEmployeeName(Name?.employee);
    getUseMongoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="text-center mb-3">
        <h1>Welcome {employeeName}</h1>
      </div>
      <hr />
      <div className="btn-container mb-3 mt-1">
        <Button variant="primary" onClick={prevTab}>
          Back
        </Button>
        <h4>
          <b>Employee Table</b>
        </h4>
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
            <th>Technology</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userMongoData?.map((newdata, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{newdata?.firstname}</td>
              <td>{newdata?.lastname}</td>
              <td>{newdata?.technology}</td>
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
        <EmployeeInformation
          show={show}
          onHide={handleClose}
          userdata={editData}
        />
      )}
      {deleteShowModal && (
        <EmployeeDeleteModal
          show={deleteShowModal}
          onHide={handleDeleteClose}
          userdata={deleteData}
        />
      )}
    </>
  );
}
