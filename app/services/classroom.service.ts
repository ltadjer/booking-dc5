import api from "./api.service";

const ENDPOINT = "/classrooms";

const fetchAll = async () => {
  const response = await api.get(ENDPOINT);
  return response.data;
};

const ClassroomService = {
  fetchAll,
};

export default ClassroomService;
