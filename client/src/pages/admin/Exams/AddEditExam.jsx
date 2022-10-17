import { Col, Form, Row, Select } from "antd";
import React from "react";
import PageTitle from "../../../components/PageTitle";

const AddEditExam = () => {
  const onFinish = (values) => {
    console.log(values);
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
            <Form.Item label="Total Marks" name="totalmarks">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Passing Marks" name="passingmarks">
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
