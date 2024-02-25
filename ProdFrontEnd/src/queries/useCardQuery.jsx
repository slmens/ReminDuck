/* eslint-disable no-unused-vars */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCallReminderByUserId } from "../service/CardReminderService";

const useCardQuery = (id) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["card", id],
    queryFn: () => fetchCallReminderByUserId(),
  });

  return { query };
};

export default useCardQuery;
