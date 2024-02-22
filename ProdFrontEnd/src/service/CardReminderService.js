/* eslint-disable no-unused-vars */
import axiosInstance from "./AxiosInstance.js";

const jwtToken = localStorage.getItem("au");
const cleanedToken = jwtToken.replace(/^"(.*)"$/, "$1");

const fecthAllCards = async () => {
  if (!jwtToken) {
    throw new Error("JWT token not found in localStorage");
  }
  try {
    const response = await axiosInstance.get("/callReminder", {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { fecthAllCards };
