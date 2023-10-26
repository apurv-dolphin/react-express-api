import { useCallback, useEffect, useState } from "react";
import "./App.css";
import GlobalApi from "./service/GlobalBaseUrl";
import UserTable from "./component/UserTable";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [userData, setUserData] = useState([]);
  const getApiCall = useCallback(async () => {
    try {
      const response = await GlobalApi.get("/users");
      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);
  useEffect(() => {
    getApiCall();
  }, [getApiCall]);

  return (
    <>
      <ToastContainer />
      <UserTable userdata={userData} getapicall={getApiCall} />
    </>
  );
}

export default App;
