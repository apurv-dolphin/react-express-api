/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import { UseMongoUserData } from "../../contextAPI/mongo/mongoContextAPI";
import EmployeeInformation from "./EmployeeInformation";
import EmployeeDeleteModal from "./EmployeeDeleteModal";
import { useNavigate } from "react-router-dom";
import ImageDisplay from "./ImageDisplay";
import * as XLSX from "xlsx";
import sendEmailToUser from "../../service/mongo/sendEmailToUser";

export default function EmployeeTable() {
  const { userMongoData, getUseMongoData, loading } = UseMongoUserData();
  const [employeeName, setEmployeeName] = useState("");
  const [show, setShow] = useState(false);
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [editData, setEditData] = useState({});
  const [emailData, setEmailData] = useState({
    name: "",
    email: "",
    subject: "",
  });
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

  const exportToExcel = async () => {
    const excelData = userMongoData?.map((newdata, index) => ({
      "#": index + 1,
      "First Name": newdata?.firstname,
      "Last Name": newdata?.lastname,
      Technology: newdata?.technology,
      Email: newdata?.email,
      Phone: newdata?.phone,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = await XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const a = document.createElement("a");
    const dataUrl = URL.createObjectURL(blob);
    a.href = dataUrl;
    a.download = "EmployeeData.xlsx";
    a.click();

    URL.revokeObjectURL(dataUrl);
  };
  // need to work on proper downloaded file
  const downloadCSV = () => {
    const csvData = userMongoData?.map((newdata, index) => ({
      "#": index + 1,
      "First Name": newdata?.firstname,
      "Last Name": newdata?.lastname,
      Technology: Array.isArray(newdata?.technology)
        ? newdata.technology.join(", ")
        : newdata?.technology,
      Email: newdata?.email,
      Phone: newdata?.phone,
    }));

    const headers = Object.keys(csvData[0]);

    console.log(headers);

    const csvContent =
      headers.join(",") +
      "\n" +
      csvData
        .map((row) =>
          headers.map((newdata) =>
            newdata === "Technology" ? `"${row[newdata]}"` : `"${row[newdata]}"`
          )
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, "export.csv");
    } else {
      // Other browsers
      const csvUrl = URL.createObjectURL(blob);

      link.href = csvUrl;
      link.style = "visibility:hidden";
      link.download = "export.csv";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the object URL
      URL.revokeObjectURL(csvUrl);
    }
  };

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

  useEffect(() => {
    const Name = JSON.parse(sessionStorage.getItem("token"));
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
        <div>
          <Button variant="primary" onClick={() => handleShow(null)}>
            Create
          </Button>
          <Button variant="success" onClick={exportToExcel}>
            Export to Excel
          </Button>
          <Button variant="success" onClick={downloadCSV}>
            Download CSV
          </Button>
        </div>
      </div>
      <div className="mobile-scroll-view">
        <Table striped bordered hover style={{ position: "relative" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Technology</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Profile</th>
              <th>Action</th>
            </tr>
          </thead>
          {loading ? (
            <tbody>
              <tr style={{ height: "100px" }}>
                <td colSpan={8}>
                  <div className="custom-loading"></div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {userMongoData?.map((newdata, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{newdata?.firstname}</td>
                  <td>{newdata?.lastname}</td>
                  <td className="tech-width">{newdata?.technology}</td>
                  <td>{newdata?.email}</td>
                  <td>{newdata?.phone}</td>
                  <td>
                    <ImageDisplay src={newdata?.photoUrl} />
                  </td>
                  <td>
                    <span className="action-btn">
                      <BiEdit onClick={() => handleShow(newdata)} />
                      <RiDeleteBin2Fill
                        onClick={() => handleDeleteShow(newdata)}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
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
    </>
  );
}
