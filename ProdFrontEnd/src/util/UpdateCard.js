import { updateCard } from "../service/CardReminderService";

const handleUpdate = async (e, values) => {
  e.preventDefault();
  // reminderto create gibi remindertoupdate yap
  await updateCard(values);
};

export default handleUpdate;
