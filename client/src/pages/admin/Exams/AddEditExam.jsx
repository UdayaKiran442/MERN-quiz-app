import { Col, Form, message, Row, Select, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addExam, editExamById, getExamById } from "../../../api/exam";
import PageTitle from "../../../components/PageTitle";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import TabPane from "antd/lib/tabs/TabPane";

const AddEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [examData, setExamData] = useState(null);
  useEffect(() => {
    const getExamData = async () => {
      try {
        dispatch(showLoading());
        const response = await getExamById(params.id);
        dispatch(hideLoading());
        if (response.success) {
          setExamData(response.data);
        } else {
          message.error(response.error);
        }
      } catch (error) {
        dispatch(hideLoading());
        message.error(error.message);
      }
    };
    if (params.id) getExamData();
  }, []);
  const onFinish = async (values) => {
    console.log(values);
    try {
      let response;
      dispatch(showLoading());
      if (params.id) {
        response = await editExamById(params.id, values);
      } else {
        response = await addExam(values);
      }
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        dispatch(hideLoading());
        message.error(response.error);
      }
    } catch (error) {}
  };
  return (
    <div>
      {params.id ? (
        <PageTitle title="Edit Exam" />
      ) : (
        <PageTitle title="Add Exam" />
      )}
      {(examData || !params.id) && (
        <Form layout="vertical" onFinish={onFinish} initialValues={examData}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam Details" key="1"></TabPane>
            {params.id && (
              <TabPane tab="Exam Questions" key="2">
                <h1>Question</h1>
              </TabPane>
            )}
          </Tabs>
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
      )}
    </div>
  );
};

export default AddEditExam;
