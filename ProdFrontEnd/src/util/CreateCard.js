/* eslint-disable no-unused-vars */
import { createCard } from "../service/CardReminderService";

const handleCreate = async (e, values) => {
  e.preventDefault();

  const userId = localStorage.getItem("id");
  const trimmedId = userId.substring(1, userId.length - 1);

  const reminderToCreate = {
    whoToCall: values.whoToCall,
    description: values.description,
    callReminderDays: values.callReminderDays,
    callReminderTime: values.callReminderTime,
    user_id: trimmedId,
  };

  await createCard(reminderToCreate);
};

export default handleCreate;
