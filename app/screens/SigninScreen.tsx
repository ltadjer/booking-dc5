import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const SigninScreen = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const { signin } = useAuth();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Sign In</Text>

            <TextInput
                placeholder="Email"
                onChangeText={(text) =>
                    setCredentials({ ...credentials, email: text })
                }
            />
            <TextInput
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) =>
                    setCredentials({ ...credentials, password: text })
                }
            />
            <Button
                mode="contained"
                onPress={() => signin(credentials.email, credentials.password)}
            >
                Sign In
            </Button>

            <Button mode="text" onPress={() => navigation.navigate("Signup")}>
                Pas encore inscrit ? Créez un compte
            </Button>
        </View>
    );
};

export default SigninScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 20,
    },
});