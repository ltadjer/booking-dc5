import api from "./api.service";

const ENDPOINT = "/users";

const fetchCurrentUser = async () => {
  const response = await api.get(`${ENDPOINT}/me`);
  console.log("response", response);
  return response.data;
};

const UserService = {
  fetchCurrentUser,
};

export default UserService;
