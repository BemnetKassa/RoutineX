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
      <View style={styles.metaRow}>
        <Text style={styles.typeChip}>{item.routineType.toUpperCase()}</Text>
      </View>
      {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
      {item.details && Object.keys(item.details).length > 0 ? (
        <Text style={styles.detailsPreview}>
          {Object.entries(item.details)
            .slice(0, 2)
            .map(([key, value]) => `${key}: ${value}`)
            .join("  |  ")}
        </Text>
      ) : null}

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
        <Text style={styles.primaryTagline}>Never forget what matters.</Text>
        <Text style={styles.secondaryTagline}>From chaos to clarity.</Text>
      </View>

      <View style={styles.addButton}>
        <Button
          title="➕ Add Routine"
          onPress={() => navigation.navigate("RoutineType")}
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
    backgroundColor: "#f0ece4",
  },
  header: {
    marginBottom: 18,
    backgroundColor: "#fff6e4",
    padding: 16,
    borderRadius: 14,
  },
  heading: {
    fontSize: 40,
    fontWeight: "700",
    color: "#1B1B1B",
  },
  primaryTagline: {
    fontSize: 20,
    color: "#2F2F2F",
    marginTop: 8,
    fontWeight: "600",
  },
  secondaryTagline: {
    fontSize: 16,
    color: "#6B6B6B",
    marginTop: 2,
  },
  addButton: {
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7E2DA",
    marginBottom: 12,
    shadowColor: "#0B0B0B",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  typeChip: {
    fontSize: 11,
    color: "#334155",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: "hidden",
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    flex: 1,
    paddingRight: 10,
  },
  time: {
    fontSize: 14,
    color: "#1D4ED8",
    fontWeight: "600",
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#5B5B5B",
  },
  detailsPreview: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748B",
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
    color: "#1A1A1A",
  },
  emptyText: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 6,
    textAlign: "center",
  },
});