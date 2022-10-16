import { message } from "antd";
import React, { useEffect } from "react";
import { getUserInfo } from "../api/user";

const ProtectedRoute = ({ children }) => {
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserInfo();
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response.error);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    getUserData();
  }, []);
  return <div>{children}</div>;
};

export default ProtectedRoute;
