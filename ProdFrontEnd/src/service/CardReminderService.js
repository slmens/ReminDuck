/* eslint-disable no-unused-vars */
import axiosInstance from "./AxiosInstance.js";

const jwtToken = localStorage.getItem("au");
const cleanedToken = jwtToken ? jwtToken.replace(/^"(.*)"$/, "$1") : null;
const userId = localStorage.getItem("id");
const trimmedUserId = userId ? userId.replace(/^"(.*)"$/, "$1") : null;

const fecthAllCards = async () => {
  if (!cleanedToken) {
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

const fetchCallReminderByUserId = async () => {
  if (!jwtToken) {
    throw new Error("JWT token not found in localStorage");
  } else {
    if (userId == null) {
      throw new Error("User ID not found in localStorage");
    } else {
      try {
        const response = await axiosInstance.get(
          `/callReminder/byUser/${trimmedUserId}`,
          {
            headers: {
              Authorization: `Bearer ${cleanedToken}`,
            },
          }
        );

        return response.data; // Make sure to return the data here
      } catch (error) {
        console.error("Error fetching call reminders by user id:", error);
        throw new Error("Error fetching call reminders by user id:", error);
      }
    }
  }
};

export {
  createCard,
  updateCard,
  deleteCard,
  fecthAllCards,
  fetchCallReminderByUserId,
};
