import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const SignupScreen = () => {
    const [credentials, setCredentials] = useState({
        name: "",
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
        signup(credentials.email, credentials.password, credentials.name);    };

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label="Nom d'utilisateur"
                onChangeText={(text) =>
                    setCredentials({ ...credentials, name: text })
                }
            />

            <TextInput
                mode="outlined"
                label="Email"
                onChangeText={(text) =>
                    setCredentials({ ...credentials, email: text })
                }
            />

            <TextInput
                mode="outlined"
                label="Mot de passe"
                secureTextEntry={true}
                onChangeText={(text) =>
                    setCredentials({ ...credentials, password: text })
                }
            />

            <TextInput
                mode="outlined"
                label="Confirmer le mot de passe"
                secureTextEntry={true}
                onChangeText={(text) =>
                    setCredentials({ ...credentials, confirmPassword: text })
                }
            />

            <Button mode="contained" onPress={handleSubmit}>
                S'inscrire
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