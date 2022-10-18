import { Form, Modal } from "antd";
import React from "react";

const QuestionModal = ({
  setShowQuestionModal,
  showQuestionModal,
  examId,
  refreshData,
}) => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Modal
        title="Add question"
        open={showQuestionModal}
        footer={false}
        onCancel={() => setShowQuestionModal(false)}
      >
        <Form onFinish={onFinish} layout={"vertical"}>
          <Form.Item name="name" label="Question">
            <input type="text" />
          </Form.Item>
          <Form.Item name="correctOption" label="Answer">
            <input type="text" />
          </Form.Item>
          <div className="flex gap-3">
            <Form.Item name="A" label="Option A">
              <input type="text" />
            </Form.Item>
            <Form.Item name="B" label="Option B">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex gap-3">
            <Form.Item name="C" label="Option C">
              <input type="text" />
            </Form.Item>
            <Form.Item name="D" label="Option D">
              <input type="text" />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <button
              className="primary-outlined-btn"
              onClick={() => {
                setShowQuestionModal(false);
              }}
            >
              Cancel
            </button>
            <button className="primary-contained-btn">Save</button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionModal;
