import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../api/exam";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import Instructions from "./Instructions";

const WriteExam = () => {
  const [examsData, setExamData] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
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
  useEffect(() => {
    if (params.id) getExamData();
  }, []);
  return (
    <div>
      {examsData && <h1 className="text-center">{examsData?.name}</h1>}
      <Instructions examsData={examsData} />
    </div>
  );
};

export default WriteExam;
