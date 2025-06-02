import { StyleSheet, Text, View } from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ClassroomCard = ({ classroom, onPress }) => {
    const navigation = useNavigation();
    return (
        <Card style={styles.card}>
            <Card.Title title={classroom.name} titleStyle={styles.cardTitle} />
            <Card.Content>
                <Text>Capacité : {classroom.capacity}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate("ClassroomDetails", { classroomId: classroom.id })}
                >
                    Voir les détails
                </Button>
            </Card.Actions>
        </Card>
    );
};

export default ClassroomCard;

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "blue",
    },
});