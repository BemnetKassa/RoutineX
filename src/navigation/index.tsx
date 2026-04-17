import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import AddRoutineScreen from "../screens/AddRoutineScreen";
import RoutineTypeScreen from "../screens/RoutineTypeScreen";

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
        <Stack.Screen name="AddRoutine" component={AddRoutineScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}