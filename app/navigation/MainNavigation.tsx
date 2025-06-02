import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import ClassroomDetailsScreen from "../screens/ClassroomDetailsScreen";
import TabNavigation from "./TabNavigation";
import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const MainNavigation = () => {
    const { user } = useContext(AuthContext);
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <>
                        <Stack.Screen name="Signin" component={SigninScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Tab" component={TabNavigation} />
                        <Stack.Screen name="ClassroomDetails" component={ClassroomDetailsScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;