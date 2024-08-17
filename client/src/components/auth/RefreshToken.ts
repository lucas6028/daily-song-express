import axios from "axios";

export default function RefreshToken() {
  axios
    .post("http://localhost:3000/refresh", {})
    .then((res) => {
      console.log("The access token has been refreshed!");
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
