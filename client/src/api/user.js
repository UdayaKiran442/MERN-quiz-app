import apiInstance from ".";

export const register = async (payload) => {
  try {
    const response = await apiInstance.post("/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
