import axios from "axios";

export default function RefreshToken() {
  axios
    .post(`${import.meta.env.VITE_SERVER_URL}/refresh`, {})
    .then((res) => {
      console.log("The access token has been refreshed!");
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
