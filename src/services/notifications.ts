import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const ensureNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
};

const parseTimeToDate = (time: string) => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  const now = new Date();
  const scheduled = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0,
  );

  if (scheduled.getTime() <= now.getTime()) {
    scheduled.setDate(scheduled.getDate() + 1);
  }

  return scheduled;
};

const parseTimeParts = (time: string) => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;

  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;

  return { hour, minute };
};

export const scheduleNotification = async (title: string, time: string) => {
  const date = parseTimeToDate(time);
  if (!date) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "RoutineX Reminder",
      body: title,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date,
    },
  });
};

const WEEKDAY_NUMBER: Record<string, number> = {
  sunday: 1,
  monday: 2,
  tuesday: 3,
  wednesday: 4,
  thursday: 5,
  friday: 6,
  saturday: 7,
};

export const scheduleWeeklyPlanNotifications = async (
  title: string,
  time: string,
  weeklyPlan: Record<string, string>,
) => {
  const timeParts = parseTimeParts(time);
  if (!timeParts) return;

  const entries = Object.entries(weeklyPlan).filter(
    ([, workout]) => workout.trim().length > 0,
  );
  if (entries.length === 0) return;

  for (const [day, workout] of entries) {
    const weekday = WEEKDAY_NUMBER[day.toLowerCase()];
    if (!weekday) continue;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "RoutineX Weekly Gym",
        body: `${title}: ${workout.trim()}`,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday,
        hour: timeParts.hour,
        minute: timeParts.minute,
      },
    });
  }
};
