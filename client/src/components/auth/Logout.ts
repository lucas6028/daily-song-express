import axios from "axios";
import { removeAccessToken } from "../../utils/cookieUtils";

export const handleLogout = async () => {
  try {
    const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`);
    console.log(data);
    removeAccessToken();
    window.location.href = "/";
  } catch (err) {
    console.error("Error while log out: " + err);
  }
};
