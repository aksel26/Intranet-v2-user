import { apiClient } from "../../client";

export const newService = {
  // GET

  updateNew: (values: any) => apiClient.patch(`/users/intranet/approval/${values.commuteIdx}/last-check`, values.body),
};
