import { StyleSheet, Text, View } from "react-native";
import {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import {Button, TextInput} from "react-native-paper";
import {useAuth} from "../hooks/useAuth";

const ProfilScreen = () => {
    const {user} = useContext(AuthContext);
    console.log(user);
    const { signout, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const handleUpdate = async () => {
        try {
            await updateUser(formData);
            alert("Profil mis à jour avec succès !");
        } catch (error) {
            alert("Erreur lors de la mise à jour du profil.");
        }
    };

    const handleSignOut = async () => {
        await signout();
        alert("Vous avez été déconnecté.");
    };

    return (
    <View style={styles.container}>
      <Text>Mon profil</Text>
        <TextInput
            placeholder="Nom"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <Button mode="contained" onPress={handleUpdate}>
            Mettre à jour
        </Button>
        <Button onPress={handleSignOut}>
            Sign Out
        </Button>
    </View>
  );
};

export default ProfilScreen;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 20,
    },
});