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

const createCard = async (reminderToCreate) => {
  await axiosInstance
    .post("/callReminder/save", reminderToCreate, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    })
    .then(() => {
      console.log("Reminder created");
    })
    .catch((error) => {
      console.error("Error creating reminder:", error);
    });
};

const updateCard = async (reminderToUpdate) => {
  await axiosInstance
    .put(`/callReminder/${reminderToUpdate.id}`, reminderToUpdate, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    })
    .then(() => {
      console.log("Reminder updated");
    })
    .catch((error) => {
      console.error("Error updating reminder:", error);
    });
};

export { fecthAllCards, createCard, updateCard };
