import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddRoutineScreen from "../screens/AddRoutineScreen";
import RoutineTypeScreen from "../screens/RoutineTypeScreen";
import GymRoutineScreen from "../screens/GymRoutineScreen";
import StudyRoutineScreen from "../screens/StudyRoutineScreen";
import ReadingRoutineScreen from "../screens/ReadingRoutineScreen";
import OtherRoutineScreen from "../screens/OtherRoutineScreen";
import DailyHabitsScreen from "../screens/DailyHabitsScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="RoutineType"
          component={RoutineTypeScreen}
          options={{ title: "Pick a routine" }}
        />
        <Stack.Screen name="GymRoutine" component={GymRoutineScreen} />
        <Stack.Screen name="StudyRoutine" component={StudyRoutineScreen} />
        <Stack.Screen name="ReadingRoutine" component={ReadingRoutineScreen} />
        <Stack.Screen name="OtherRoutine" component={OtherRoutineScreen} />
        <Stack.Screen name="DailyHabits" component={DailyHabitsScreen} />
        <Stack.Screen name="AddRoutine" component={AddRoutineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}