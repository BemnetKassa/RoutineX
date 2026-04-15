import { View, Text, Button, FlatList } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { getRoutines, deleteRoutine } from "../db/routines";
import { useRoutineStore } from "../store/routineStore";


export default function HomeScreen({ navigation }: any) {
  const { routines, setRoutines } = useRoutineStore();

  useFocusEffect(
    useCallback(() => {
      getRoutines(setRoutines);
    }, [setRoutines]),
  );

  const renderItem = ({ item }: { item: { id: number; title: string; description: string; time: string } }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>{item.time}</Text>

      <Button
        title="Delete"
        onPress={() => {
          deleteRoutine(item.id, () => getRoutines(setRoutines));
        }}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="➕ Add Routine"
        onPress={() => navigation.navigate("AddRoutine")}
      />

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}