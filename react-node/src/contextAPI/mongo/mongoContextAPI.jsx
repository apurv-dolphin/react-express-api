/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import getMongoUser from "../../service/mongo/getMongoUser";

const UserMongoDataContext = createContext();

export const UserMongoDataProvider = ({ children }) => {
  const [userMongoData, setUserMongoData] = useState([]);

  const getUseMongoData = async () => {
    try {
      // get all employees data
      const response = await getMongoUser(); 
      setUserMongoData(response?.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <UserMongoDataContext.Provider value={{ userMongoData, getUseMongoData }}>
      {children}
    </UserMongoDataContext.Provider>
  );
};

export const UseMongoUserData = () => {
  return useContext(UserMongoDataContext);
};
