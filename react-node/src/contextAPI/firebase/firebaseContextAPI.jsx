/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import getUser from "../../service/firebaseAPI/getUser";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState([]);

  const getUseData = async () => {
    try {
      const response = await getUser(); // Import your getUser function
      setUserData(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, getUseData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const UseUserData = () => {
  return useContext(UserDataContext);
};
