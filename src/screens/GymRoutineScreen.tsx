import { ScrollView, View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import { addRoutine } from "../db/routines";
import { scheduleWeeklyPlanNotifications } from "../services/notifications";

const WEEK_DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

type WeekDay = (typeof WEEK_DAYS)[number];

const formatDayLabel = (day: WeekDay) => day.charAt(0).toUpperCase() + day.slice(1);

export default function GymRoutineScreen({ navigation }: any) {
  const [title, setTitle] = useState("Gym workout");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [weeklyPlan, setWeeklyPlan] = useState<Record<WeekDay, string>>({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: "",
  });

  const saveRoutine = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedTime = time.trim();

    if (!trimmedTitle) {
      Alert.alert("Missing title", "Please enter a routine title.");
      return;
    }

    if (!/^\d{1,2}:\d{2}$/.test(trimmedTime)) {
      Alert.alert("Invalid time", "Use HH:MM format, e.g. 07:30.");
      return;
    }

    const hasAnyWorkout = Object.values(weeklyPlan).some((workout) => workout.trim().length > 0);
    if (!hasAnyWorkout) {
      Alert.alert("Weekly plan needed", "Please add at least one workout day.");
      return;
    }

    addRoutine(
      trimmedTitle,
      trimmedDescription,
      trimmedTime,
      async () => {
        await scheduleWeeklyPlanNotifications(trimmedTitle, trimmedTime, weeklyPlan);
      },
      {
        routineType: "gym",
        details: {
          ...weeklyPlan,
        },
      },
    );
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Gym workout</Text>
      <Text style={styles.subheading}>Set your weekly workout once and get reminded every week.</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Gym workout"
        onChangeText={setTitle}
        value={title}
        style={styles.input}
      />

      <Text style={styles.label}>Workout focus</Text>
      <TextInput
        placeholder="Leg day, cardio, push/pull"
        onChangeText={setDescription}
        value={description}
        style={styles.input}
      />

      <Text style={styles.planHeading}>Weekly workout plan</Text>
      {WEEK_DAYS.map((day) => (
        <View key={day}>
          <Text style={styles.label}>{formatDayLabel(day)}</Text>
          <TextInput
            placeholder={`Workout for ${formatDayLabel(day)} (optional)`}
            onChangeText={(value) =>
              setWeeklyPlan((previous) => ({
                ...previous,
                [day]: value,
              }))
            }
            value={weeklyPlan[day]}
            style={styles.input}
          />
        </View>
      ))}

      <Text style={styles.label}>Time</Text>
      <TextInput
        placeholder="07:30"
        onChangeText={setTime}
        value={time}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <Button title="Save Routine" onPress={saveRoutine} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F5",
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
  subheading: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 20,
  },
  planHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 15,
  },
  buttonRow: {
    marginTop: 8,
  },
}
);