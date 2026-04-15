import { View, TextInput, Button } from "react-native";
import { useState } from "react";

import { addRoutine } from "../db/routines";
import { scheduleNotification } from "../services/notifications";

export default function AddRoutineScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  const saveRoutine = async () => {
    if (!title.trim()) return;

    addRoutine(title.trim(), description.trim(), time.trim(), async () => {
      await scheduleNotification(title.trim(), time.trim());
    });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Title" onChangeText={setTitle} />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <TextInput placeholder="Time (e.g 07:30)" onChangeText={setTime} />

      <Button title="Save Routine" onPress={saveRoutine} />
    </View>
  );
}