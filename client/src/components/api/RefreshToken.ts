import axios from "axios";

async function RefreshToken() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/refresh`, {
      withCredentials: true,
    });
    console.log(res.data);
  } catch (err) {
    console.error("Error while refresh token: " + err);
  }
}

export default RefreshToken;
