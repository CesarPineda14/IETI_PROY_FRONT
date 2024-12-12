import axios from "axios";

const API_URL = "http://localhost:37000/api/auth"; 

const auth = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, null, {
        params: {
          username,
          password
        }
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      return { success: false };
    }
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default auth;