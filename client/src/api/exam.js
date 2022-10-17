import apiInstance from ".";

export const addExam = async (payload) => {
  try {
    const response = await apiInstance.post("/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllExams = async () => {
  try {
    const response = await apiInstance.get("/exams/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getExamById = async (payload) => {
  try {
    const response = await apiInstance.get("/exams/get-exam-by-id", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
