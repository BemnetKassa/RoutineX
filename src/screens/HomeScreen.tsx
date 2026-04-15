import { View, Text, Button, FlatList } from "react-native";
import { useEffect } from "react";

import { getRoutines } from "../db/routines";
import { useRoutineStore } from "../store/routineStore";

export default function HomeScreen({ navigation }: any) {
  const { routines, setRoutines } = useRoutineStore();

  useEffect(() => {
    getRoutines(setRoutines);
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="➕ Add Routine"
        onPress={() => navigation.navigate("AddRoutine")}
      />

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 18 }}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
}