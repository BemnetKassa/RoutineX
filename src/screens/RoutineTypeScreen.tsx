import { View, Text, StyleSheet, Pressable } from "react-native";

const ROUTINE_TYPES = [
  { key: "gym", label: "Gym workout", screen: "GymRoutine" },
  { key: "study", label: "Study session", screen: "StudyRoutine" },
  { key: "reading", label: "Reading session", screen: "ReadingRoutine" },
  { key: "other", label: "Other routines", screen: "OtherRoutine" },
  { key: "habits", label: "Daily habits", screen: "DailyHabits" },
];

export default function RoutineTypeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a routine</Text>
      <Text style={styles.subheading}>
        Pick a category to start faster. You can edit details next.
      </Text>

      <View style={styles.list}>
        {ROUTINE_TYPES.map((item) => (
          <Pressable
            key={item.key}
            style={styles.card}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
          >
            <Text style={styles.cardTitle}>{item.label}</Text>
            <Text style={styles.cardMeta}>Tap to add details</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F3EF",
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1B1B1B",
  },
  subheading: {
    fontSize: 14,
    color: "#6B6B6B",
    marginTop: 6,
    marginBottom: 18,
  },
  list: {
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7E2DA",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  cardMeta: {
    fontSize: 12,
    color: "#6B6B6B",
    marginTop: 4,
  },
});
