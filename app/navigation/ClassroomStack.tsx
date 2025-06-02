import ClassroomsScreen from "../screens/ClassroomsScreen";
import ClassroomDetailsScreen from "../screens/ClassroomDetailsScreen";
import AddClassroomScreen from "../screens/AddClassroomScreen";
import { createStackNavigator } from "@react-navigation/stack";

const ClassroomStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ClassroomsHome"
        component={ClassroomsScreen}
        options={{ title: "Liste des salles" }}
      />
      <Stack.Screen
        name="ClassroomDetails"
        component={ClassroomDetailsScreen}
        options={{ title: "Détail de la salle" }}
      />
      <Stack.Screen
        name="AddClassroom"
        component={AddClassroomScreen}
        options={{ title: "Ajouter une salle" }}
      />
    </Stack.Navigator>
  );
};

export default ClassroomStack;
