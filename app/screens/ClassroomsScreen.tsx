import { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ClassroomService from "../services/classroom.service";
import ClassroomCard from "../components/ClassroomCard";
import { Button, TextInput } from "react-native-paper";
import AuthContext from "../context/AuthContext";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClassrooms, setFilteredClassrooms] = useState<any[]>([]);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const [sortBy, setSortBy] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllClassrooms();
    }, [])
  );

  useEffect(() => {
    applyFiltersAndSort();
  }, [classrooms, searchQuery, sortBy]);

  const fetchAllClassrooms = async () => {
    try {
      const response = await ClassroomService.fetchAll();
      setClassrooms(response);
    } catch (error) {
      console.error("Erreur fetch salles :", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const applyFiltersAndSort = () => {
    let filtered = classrooms.filter((classroom) => {
      const lowerQuery = searchQuery.toLowerCase();
      return (
        classroom.name.toLowerCase().includes(lowerQuery) ||
        classroom.equipment.some((equip) =>
          equip.toLowerCase().includes(lowerQuery)
        ) ||
        classroom.capacity.toString().includes(lowerQuery)
      );
    });
    if (sortBy === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "capacity") {
      filtered = filtered.sort((a, b) => a.capacity - b.capacity);
    }

    setFilteredClassrooms(filtered);
  };

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    setSelectedFilter(criteria);
  };

  return (
    <ScrollView style={styles.container}>
      {user?.role === "ADMIN" && (
        <Button
          mode="contained"
          onPress={() => navigation.navigate("AddClassroom")}
          style={styles.addButton}
        >
          Ajouter une salle
        </Button>
      )}
      <TextInput
        label="Rechercher par nom ou équipement"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />
      <View style={styles.sortButtons}>
        <Button
          mode={selectedFilter === "name" ? "contained" : "outlined"}
          onPress={() => handleSort("name")}
          style={styles.sortButton}
        >
          Trier par Nom
        </Button>
        <Button
          mode={selectedFilter === "capacity" ? "contained" : "outlined"}
          onPress={() => handleSort("capacity")}
          style={styles.sortButton}
        >
          Trier par Capacité
        </Button>
      </View>

      <View style={styles.list}>
        {filteredClassrooms.map((classroom) => (
          <ClassroomCard key={classroom.id} classroom={classroom} />
        ))}
        {filteredClassrooms.length === 0 && (
          <Text style={styles.noResult}>Aucune salle trouvée.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ClassroomsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  addButton: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  button: {
    marginBottom: 20,
  },
  sortButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  list: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  noResult: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
  },
});
