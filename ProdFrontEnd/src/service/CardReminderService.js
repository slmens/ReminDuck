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

const deleteCard = async (reminderId) => {
  await axiosInstance
    .delete(`/callReminder/${reminderId}`, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    })
    .then(() => {
      console.log("Reminder deleted");
      alert("Call Reminder Deleted!");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting reminder:", error);
    });
};

const fetchCallReminderByUserId = async (userId) => {
  if (!jwtToken) {
    throw new Error("JWT token not found in localStorage");
  }
  await axiosInstance
    .get(`/callReminder/byUser/${userId}`, {
      headers: {
        Authorization: `Bearer ${cleanedToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching call reminders by user id:", error);
      throw new Error("Error fetching call reminders by user id:", error);
    });
};

export {
  createCard,
  updateCard,
  deleteCard,
  fecthAllCards,
  fetchCallReminderByUserId,
};
