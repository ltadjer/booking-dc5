import { StyleSheet, Text, View, FlatList, Alert, Platform } from "react-native";
import { useEffect, useState } from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import ClassroomService from "../services/classroom.service";
import ReservationService from "../services/reservation.service";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

const ClassroomDetailsScreen = () => {
    const route = useRoute<RouteProp<{ params: { classroomId: number } }>>();
    const { classroomId } = route.params;
    const [classroom, setClassroom] = useState<any>(null);
    const [reservations, setReservations] = useState<any[]>([]);

    // Reservation date and time states
    const [reservationDate, setReservationDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);

    // Picker visibility & mode
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
    const [target, setTarget] = useState<'date' | 'start' | 'end'>('date');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchClassroomDetails();
        fetchClassroomReservations();
    }, []);

    const fetchClassroomDetails = async () => {
        try {
            const response = await ClassroomService.fetchById(classroomId);
            setClassroom(response);
        } catch (error) {
            console.error("Erreur récupération salle :", error);
        }
    };

    const fetchClassroomReservations = async () => {
        try {
            const response = await ReservationService.fetchClassroomReservations(classroomId);
            setReservations(response);
        } catch (error) {
            console.error("Erreur récupération réservations :", error);
        }
    };

    const handleReservation = async () => {
        if (!reservationDate || !startTime || !endTime) {
            Alert.alert("Erreur", "Veuillez sélectionner la date, l'heure de début et l'heure de fin.");
            return;
        }
        // build full datetime
        const start = new Date(
            reservationDate.getFullYear(),
            reservationDate.getMonth(),
            reservationDate.getDate(),
            startTime.getHours(),
            startTime.getMinutes()
        );
        const end = new Date(
            reservationDate.getFullYear(),
            reservationDate.getMonth(),
            reservationDate.getDate(),
            endTime.getHours(),
            endTime.getMinutes()
        );
        if (end <= start) {
            Alert.alert("Erreur", "L'heure de fin doit être après l'heure de début.");
            return;
        }

        setLoading(true);
        try {
            await ReservationService.createReservation({
                startTime: start.toISOString(),
                endTime: end.toISOString(),
                classroomId,
            });
            Alert.alert("Succès", "Réservation effectuée avec succès.");
            fetchClassroomReservations();
        } catch (error) {
            console.error("Erreur réservation :", error);
            Alert.alert("Erreur", "Impossible de réserver.");
        } finally {
            setLoading(false);
        }
    };

    const showPicker = (mode: 'date' | 'time', which: 'date' | 'start' | 'end') => {
        setPickerMode(mode);
        setTarget(which);
        setPickerVisible(true);
    };

    const onChange = (event: any, selected?: Date) => {
        setPickerVisible(false);
        if (!selected) return;
        if (target === 'date') {
            setReservationDate(selected);
        } else if (target === 'start') {
            setStartTime(selected);
        } else if (target === 'end') {
            setEndTime(selected);
        }
    };

    if (!classroom) return (
        <View style={styles.container}><Text>Chargement...</Text></View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{classroom.name}</Text>
            <Text>Capacité : {classroom.capacity}</Text>
            <Text>Équipements :</Text>
            {classroom.equipment.length ? classroom.equipment.map((e:string,i)=><Text key={i}>- {e}</Text>) : <Text>Aucun</Text>}

            <Text style={styles.subtitle}>Réservations :</Text>
            {reservations.length ? (
                <FlatList
                    data={reservations}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Text>- {format(new Date(item.startTime),'dd/MM/yyyy HH:mm')} à {format(new Date(item.endTime),'HH:mm')} par {item.user.name}</Text>
                    )}
                />
            ) : <Text>Aucune réservation</Text>}

            <Text style={styles.subtitle}>Réserver :</Text>
            <View style={styles.form}>
                <Text>Date :</Text>
                <Button onPress={() => showPicker('date','date')}>Choisir date</Button>
                {reservationDate && <Text>{format(reservationDate,'dd/MM/yyyy')}</Text>}

                <Text>Heure début :</Text>
                <Button onPress={() => showPicker('time','start')}>Choisir heure</Button>
                {startTime && <Text>{format(startTime,'HH:mm')}</Text>}

                <Text>Heure fin :</Text>
                <Button onPress={() => showPicker('time','end')}>Choisir heure</Button>
                {endTime && <Text>{format(endTime,'HH:mm')}</Text>}

                {pickerVisible && (
                    <DateTimePicker
                        is24Hour={true}
                        value={
                            target === 'date'
                                ? reservationDate || new Date()
                                : (target === 'start' ? startTime : endTime) || new Date()
                        }
                        mode={pickerMode}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={onChange}
                    />
                )}

                <Button mode="contained" style={styles.button} loading={loading} onPress={handleReservation}>
                    Réserver
                </Button>
            </View>
        </View>
    );
};

export default ClassroomDetailsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
    form: { marginTop: 20 },
    button: { marginTop: 20 },
});