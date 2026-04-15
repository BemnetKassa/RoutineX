import * as Notifications from "expo-notifications";

export const scheduleNotification = async (title: string, date: Date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "RoutineX Remidner",
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
};
