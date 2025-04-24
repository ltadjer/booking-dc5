import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";

const MainNavigation = () => {
  const [connected, setConnected] = useState(false);

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!connected ? (
          <Stack.Screen name="Signin" component={SigninScreen} />
        ) : (
          <Stack.Screen name="Tab" component={TabNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
