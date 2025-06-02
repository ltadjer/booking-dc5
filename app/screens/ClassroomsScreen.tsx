import { useEffect, useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import ClassroomService from "../services/classroom.service";
import ClassroomCard from "../components/ClassroomCard";
import { Button } from "react-native-paper";

const ClassroomsScreen = () => {
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filterName, setFilterName] = useState<string>("");
  const [minCapacity, setMinCapacity] = useState<string>("");
  const [sortField, setSortField] = useState<'name' | 'capacity' | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  // TODO: ajouter le filtre par équimenet
  useEffect(() => {
    fetchAllClassrooms();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [classrooms, filterName, minCapacity, sortField, sortAsc]);

  const fetchAllClassrooms = async () => {
    try {
      const response = await ClassroomService.fetchAll();
      setClassrooms(response);
    } catch (error) {
      console.error("Erreur fetch salles :", error);
    }
  };

  const applyFiltersAndSort = () => {
    let data = [...classrooms];
    // Filters
    if (filterName.trim()) {
      data = data.filter(c =>
          c.name.toLowerCase().includes(filterName.trim().toLowerCase())
      );
    }
    if (minCapacity.trim()) {
      const cap = parseInt(minCapacity, 10);
      if (!isNaN(cap)) {
        data = data.filter(c => c.capacity >= cap);
      }
    }
    // Sort
    if (sortField) {
      data.sort((a, b) => {
        let diff = 0;
        if (sortField === 'name') {
          diff = a.name.localeCompare(b.name);
        } else if (sortField === 'capacity') {
          diff = a.capacity - b.capacity;
        }
        return sortAsc ? diff : -diff;
      });
    }
    setFiltered(data);
  };

  const onSort = (field: 'name' | 'capacity') => {
    if (sortField === field) {
      setSortAsc(!sortAsc); // toggle order
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Filtrer les salles</Text>
        <TextInput
            style={styles.input}
            placeholder="Nom de la salle"
            value={filterName}
            onChangeText={setFilterName}
        />
        <TextInput
            style={styles.input}
            placeholder="Capacité min"
            keyboardType="numeric"
            value={minCapacity}
            onChangeText={setMinCapacity}
        />
        <Button mode="contained" onPress={applyFiltersAndSort} style={styles.button}>
          Appliquer
        </Button>

        <Text style={styles.title}>Trier les salles</Text>
        <View style={styles.sortButtons}>
          <Button
              mode={sortField === 'name' ? 'contained' : 'outlined'}
              onPress={() => onSort('name')}
              style={styles.sortButton}
          >
            Nom {sortField === 'name' && (sortAsc ? '▲' : '▼')}
          </Button>
          <Button
              mode={sortField === 'capacity' ? 'contained' : 'outlined'}
              onPress={() => onSort('capacity')}
              style={styles.sortButton}
          >
            Capacité {sortField === 'capacity' && (sortAsc ? '▲' : '▼')}
          </Button>
        </View>

        <View style={styles.list}>
          {filtered.map(classroom => (
              <ClassroomCard
                  key={classroom.id}
                  classroom={classroom}
              />
          ))}
          {filtered.length === 0 && (
              <Text style={styles.noResult}>Aucune salle trouvée.</Text>
          )}
        </View>
      </View>
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
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sortButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});