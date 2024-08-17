import axios from "axios";
import RefreshToken from "./RefreshToken";

export default function RequestAccess(urlCode: string) {
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return;
  }

  // Post the authorization code to the server
  axios
    .post(import.meta.env.VITE_SERVER_URL + "/login", { code: urlCode })
    .then((res) => {
      const expiresIn = res.data;
      console.log("Expired in:", expiresIn);

      // add interval to refresh token
      setInterval(() => {
        RefreshToken();
      }, (expiresIn - 300) * 1000);

      window.history.pushState({}, "", "/dashboard");
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      window.location.href = "/";
    });

  return null;
}
