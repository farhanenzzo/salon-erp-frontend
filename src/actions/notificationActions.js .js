import {
  INCREMENT_NOTIFICATION_COUNT,
  RESET_NOTIFICATION_COUNT,
} from "../constants";

export const incrementNotificationCount = () => ({
  type: INCREMENT_NOTIFICATION_COUNT,
});

export const resetNotificationCount = () => ({
  type: RESET_NOTIFICATION_COUNT,
});
