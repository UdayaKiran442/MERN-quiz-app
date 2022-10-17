import { Col, Form, message, Row, Select } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { addExam } from "../../../api/exam";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

const AddEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      let response = await addExam(values);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
        console.log("Add Exam response:", response);
      } else {
        dispatch(hideLoading());
        message.error(response.error);
      }
    } catch (error) {}
  };
  return (
    <div>
      <PageTitle title="Add Exam" />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={8}>
            <Form.Item label="Exam Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Exam Duration" name="duration">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Category" name="category">
              <select name="" id="">
                <option value="">Select Category</option>
                <option value="javascript">JavaScript(ES 6)</option>
                <option value="node">Node</option>
                <option value="react">React</option>
                <option value="mongo">Mongo</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Total Marks" name="totalMarks">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Passing Marks" name="passingMarks">
              <input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end ">
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddEditExam;
