import api from "./api.service";

const ENDPOINT = "/auth";

const signin = async (email: string, password: string) => {
  const response = await api.post(`${ENDPOINT}/signin`, { email, password });
  return response.data;
};

const AuthService = {
  signin,
};

export default AuthService;
