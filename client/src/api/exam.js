import apiInstance from ".";

export const addExam = async (payload) => {
  try {
    const response = await apiInstance.post("/exams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
