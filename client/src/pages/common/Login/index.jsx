import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/user";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      const response = await login(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="card w-400 p-3">
        <div className="flex flex-col">
          <h1 className="text-2xl">Login</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>
            <div className="flex flex-col gap-1">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register">Not a member? Register</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
