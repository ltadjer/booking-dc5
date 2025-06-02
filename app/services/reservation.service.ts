const ENDPOINT = '/reservations';
import api from "./api.service";

const fetchClassroomReservations = async (classroomId: number) => {
    const response = await api.get(`${ENDPOINT}/classroom/${classroomId}`);
    return response.data;
};

const createReservation = async (data: {
    startTime: string;
    endTime: string;
    classroomId: number;
}) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
}

const fetchMyReservations = async () => {
    const response = await api.get(`${ENDPOINT}/me`);
    console.log("fetchMyReservations", response.data);
    return response.data;
}

const deleteReservation = async (id: number) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
}

const ReservationService = {
    fetchClassroomReservations,
    createReservation,
    fetchMyReservations,
    deleteReservation,
}
export default ReservationService;