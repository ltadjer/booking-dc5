import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import ClassroomService from "../services/classroom.service";
import { useNavigation } from "@react-navigation/native";

const AddClassroomScreen = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [equipments, setEquipments] = useState([""]);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await ClassroomService.create({
        name,
        capacity: parseInt(capacity, 10),
        equipment: equipments.map((item) => item.trim()),
      });
      if (response) {
        alert("Salle ajoutée avec succès !");
        navigation.navigate("ClassroomsHome");
      }
    } catch (error) {
      console.error("Error adding classroom:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Nom de la salle"
        mode="outlined"
        style={styles.input}
        onChangeText={setName}
      />
      <TextInput
        label="Capacité"
        mode="outlined"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setCapacity}
      />
      <TextInput
        label="Équipements"
        mode="outlined"
        style={styles.input}
        onChangeText={(text) =>
          setEquipments(text.split(",").map((item) => item.trim()))
        }
        placeholder="Séparez les équipements par des virgules"
      />

      <Button mode="contained" onPress={handleSubmit}>
        Ajouter
      </Button>
    </View>
  );
};

export default AddClassroomScreen;

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
