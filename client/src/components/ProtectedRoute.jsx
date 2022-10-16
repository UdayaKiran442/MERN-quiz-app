import { message } from "antd";
import React, { useEffect } from "react";
import { getUserInfo } from "../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await getUserInfo();
        if (response.success) {
          message.success(response.message);
          dispatch(setUser(response.data));
        } else {
          message.error(response.error);
        }
      } catch (error) {
        message.error(error.message);
      }
    };
    getUserData();
  }, [dispatch]);
  return (
    <div>
      {children}
      {user.name}
    </div>
  );
};

export default ProtectedRoute;
