import { StyleSheet, Text, View } from "react-native";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button, TextInput } from "react-native-paper";
import { useAuth } from "../hooks/useAuth";
import UserService from "../services/user.service";

const ProfilScreen = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { signout} = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleUpdate = async () => {
    try {
      await UserService.updateUser(formData);
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
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nom"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <Button mode="contained" onPress={handleUpdate}>
        Mettre à jour
      </Button>
      <Button mode="contained" buttonColor="red" onPress={handleSignOut}>
        Déconnexion
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
  input: {
    marginBottom: 12,
  },
});
