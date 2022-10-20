import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../../api/exam";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import Instructions from "./Instructions";

const WriteExam = () => {
  const [examsData, setExamData] = useState(null);
  const [view, setView] = useState("instructions");
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuesitonIndex, setSeletedQuesitonIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
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
        setQuestions(response.data.questions);
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
      {view === "instructions" && (
        <Instructions examsData={examsData} setView={setView} />
      )}
      {view === "questions" && (
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl">
            {selectedQuesitonIndex + 1}:{questions[selectedQuesitonIndex]?.name}
          </h1>
          <div className="flex flex-col gap-2">
            {Object.keys(questions[selectedQuesitonIndex].options).map(
              (option, index) => {
                return (
                  <div
                    className={`flex gap-2 items-center ${
                      selectedOptions[selectedQuesitonIndex] === option
                        ? "selected-option"
                        : "option"
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [selectedQuesitonIndex]: option,
                      });
                    }}
                  >
                    <h1 className="text-xl">
                      {option}:
                      {questions[selectedQuesitonIndex].options[option]}
                    </h1>
                  </div>
                );
              }
            )}
          </div>
          {selectedQuesitonIndex > 0 && (
            <button
              className="primary-outlined-btn"
              onClick={() => {
                setSeletedQuesitonIndex(selectedQuesitonIndex - 1);
              }}
            >
              Previous
            </button>
          )}
          {selectedQuesitonIndex < questions.length - 1 && (
            <button
              className="primary-contained-btn"
              onClick={() => {
                setSeletedQuesitonIndex(selectedQuesitonIndex + 1);
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WriteExam;
