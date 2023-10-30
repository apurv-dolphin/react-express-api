import { useCallback, useEffect, useState } from "react";
import GlobalApi from "../service/GlobalBaseUrl";
import UserTable from "../component/UserTable";

export default function Firebase() {
  const [userData, setUserData] = useState([]);
  const getApiCall = useCallback(async () => {
    try {
      const response = await GlobalApi.get("/api/users");
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
      <UserTable userdata={userData} getapicall={getApiCall} />
    </>
  );
}
