import axios from "axios";

export const handleLogout = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`, {
      withCredentials: true,
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error while log out: " + err);
  }
};
