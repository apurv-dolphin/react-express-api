/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import getMongoUser from "../../service/mongo/getMongoUser";

const UserMongoDataContext = createContext();

export const UserMongoDataProvider = ({ children }) => {
  const [userMongoData, setUserMongoData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUseMongoData = async () => {
    setLoading(true);
    try {
      // get all employees data
      const response = await getMongoUser();
      setUserMongoData(response?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <UserMongoDataContext.Provider
      value={{ userMongoData, getUseMongoData, loading }}
    >
      {children}
    </UserMongoDataContext.Provider>
  );
};

export const UseMongoUserData = () => {
  return useContext(UserMongoDataContext);
};
