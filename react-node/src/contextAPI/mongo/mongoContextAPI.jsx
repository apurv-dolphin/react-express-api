/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import getMongoUser from "../../service/mongo/getMongoUser";
import { useNavigate } from "react-router-dom";

const UserMongoDataContext = createContext();

export const UserMongoDataProvider = ({ children }) => {
  const navigate = useNavigate();
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
      navigate("/");
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
