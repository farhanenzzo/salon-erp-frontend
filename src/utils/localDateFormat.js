import { DATE_FORMAT } from "../constants";
import { format } from "date-fns";

export const formatDate = (date) => {
  const localDate = new Date(date).toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  return format(new Date(localDate), DATE_FORMAT);
};
