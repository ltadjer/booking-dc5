import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Alert, Platform } from "react-native";
import { Button } from "react-native-paper";
import ReservationService from "../services/reservation.service";
import { format } from "date-fns";

const ReservationsScreen = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setLoading(true);
        try {
            const response = await ReservationService.fetchMyReservations();
            setReservations(response);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations :", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (reservationId: number) => {
        Alert.alert(
            "Confirmation",
            "Voulez-vous vraiment supprimer cette réservation ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await ReservationService.deleteReservation(reservationId);
                            Alert.alert("Succès", "Réservation supprimée avec succès.");
                            await fetchReservations();
                        } catch (error) {
                            console.error("Erreur lors de la suppression :", error);
                            Alert.alert("Erreur", "Impossible de supprimer la réservation.");
                        }
                    },
                },
            ]
        );
    };

    const renderReservation = ({ item }: { item: any }) => (
        <View style={styles.reservationCard}>
            <Text style={styles.reservationText}>
                {format(new Date(item.startTime), "dd/MM/yyyy HH:mm")} - {format(new Date(item.endTime), "dd/MM/yyyy HH:mm")}
            </Text>
            <Text style={styles.reservationText}>Salle : {item.classroom.name}</Text>
            <Button
                mode="contained"
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                Supprimer
            </Button>
        </View>
    );

    const now = new Date();
    const todayStr = format(now, "dd/MM/yyyy");
    const ongoingReservations = reservations.filter(
        (res) => new Date(res.endTime) > now
    );
    const pastReservations = reservations.filter(
        (res) => new Date(res.endTime) <= now
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mes Réservations</Text>
            <Text style={styles.date}>Aujourd'hui : {todayStr}</Text>

            {loading ? (
                <Text>Chargement...</Text>
            ) : (
                <>
                    <Text style={styles.subtitle}>Réservations en cours</Text>
                    {ongoingReservations.length > 0 ? (
                        <FlatList
                            data={ongoingReservations}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderReservation}
                        />
                    ) : (
                        <Text>Aucune réservation en cours.</Text>
                    )}

                    <Text style={styles.subtitle}>Réservations passées</Text>
                    {pastReservations.length > 0 ? (
                        <FlatList
                            data={pastReservations}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderReservation}
                        />
                    ) : (
                        <Text>Aucune réservation passée.</Text>
                    )}
                </>
            )}
        </View>
    );
};

export default ReservationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    date: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
    },
    reservationCard: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    reservationText: {
        fontSize: 16,
        marginBottom: 5,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: "red",
    },
});
