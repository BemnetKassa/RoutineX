import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { getRoutines, deleteRoutine } from "../db/routines";
import { useRoutineStore } from "../store/routineStore";
import { Routine } from "../models/Routine";


export default function HomeScreen({ navigation }: any) {
  const { routines, setRoutines } = useRoutineStore();

  useFocusEffect(
    useCallback(() => {
      getRoutines(setRoutines);
    }, [setRoutines]),
  );

  const renderItem = ({ item }: { item: Routine }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}

      <View style={styles.actions}>
        <Button
          title="Delete"
          color="#B42318"
          onPress={() => {
            deleteRoutine(item.id, () => getRoutines(setRoutines));
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>RoutineX</Text>
        <Text style={styles.subheading}>Never forget what matters.</Text>
      </View>

      <View style={styles.addButton}>
        <Button
          title="➕ Add Routine"
          onPress={() => navigation.navigate("AddRoutine")}
        />
      </View>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={routines.length === 0 ? styles.emptyList : undefined}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No routines yet</Text>
            <Text style={styles.emptyText}>Tap “Add Routine” to create your first reminder.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F7F5",
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E1E1E",
  },
  subheading: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  addButton: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    paddingRight: 10,
  },
  time: {
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#4B5563",
  },
  actions: {
    marginTop: 12,
    alignItems: "flex-start",
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },
});