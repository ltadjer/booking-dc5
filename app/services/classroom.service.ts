const ENDPOINT = '/classrooms';
import api from "./api.service";

const fetchAll = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
}

const ClassroomService = {
    fetchAll
}

export default ClassroomService;