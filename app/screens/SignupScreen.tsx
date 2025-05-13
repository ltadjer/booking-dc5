import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const SignupScreen = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { signup } = useAuth();

    const handleSubmit = () => {
        if (credentials.password !== credentials.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        signup(credentials.email, credentials.password);
    };

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>

            <TextInput
                placeholder="Email"
                onChangeText={(text) =>
                    setCredentials({ ...credentials, email: text })
                }
            />

            <TextInput
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={(text) =>
                    setCredentials({ ...credentials, password: text })
                }
            />

            <TextInput
                placeholder="Confirmer le mot de passe"
                secureTextEntry={true}
                onChangeText={(text) =>
                    setCredentials({ ...credentials, confirmPassword: text })
                }
            />

            <Button mode="contained" onPress={handleSubmit}>
                Sign Up
            </Button>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 20,
    },
});