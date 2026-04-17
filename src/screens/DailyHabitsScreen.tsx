import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { useState } from "react";

import { addRoutine } from "../db/routines";
import { scheduleNotification } from "../services/notifications";

export default function DailyHabitsScreen({ navigation }: any) {

  const [title, setTitle] = useState("Daily habits");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [habitList, setHabitList] = useState("");
  const [targetStreak, setTargetStreak] = useState("");
  const [habitCue, setHabitCue] = useState("");

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

    addRoutine(
      trimmedTitle,
      trimmedDescription,
      trimmedTime,
      async () => {
        await scheduleNotification(trimmedTitle, trimmedTime);
      },
      {
        routineType: "habits",
        details: {
          habitList,
          targetStreak,
          habitCue,
        },
      },
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily habits</Text>
      <Text style={styles.subheading}>Build steady daily rituals that stick.</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        placeholder="Daily habits"
        onChangeText={setTitle}
        value={title}
        style={styles.input}
      />

      <Text style={styles.label}>Habit list</Text>
      <TextInput
        placeholder="Hydrate, stretch, journal"
        onChangeText={setDescription}
        value={description}
        style={styles.input}
      />

      <Text style={styles.label}>Specific habits</Text>
      <TextInput
        placeholder="Water, vitamins, walk"
        onChangeText={setHabitList}
        value={habitList}
        style={styles.input}
      />

      <Text style={styles.label}>Target streak</Text>
      <TextInput
        placeholder="30 days"
        onChangeText={setTargetStreak}
        value={targetStreak}
        style={styles.input}
      />

      <Text style={styles.label}>Habit cue</Text>
      <TextInput
        placeholder="After breakfast"
        onChangeText={setHabitCue}
        value={habitCue}
        style={styles.input}
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        placeholder="08:00"
        onChangeText={setTime}
        value={time}
        style={styles.input}
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <Button title="Save Routine" onPress={saveRoutine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F5",
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