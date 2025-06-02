const ENDPOINT = '/classrooms';
import api from "./api.service";

const fetchAll = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
}

const fetchById = async (id: number) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
}

const ClassroomService = {
    fetchAll,
    fetchById,
}

export default ClassroomService;