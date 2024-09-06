import axios from "axios";
import { setAccessToken } from "../../utils/cookieUtils";

export default function RequestAccess(urlCode: string): Promise<boolean> {
  console.log(`server url: ${import.meta.env.VITE_SERVER_URL}/login`);
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return Promise.resolve(false); // Return a resolved Promise with `false`;
  }

  // Post the authorization code to the server
  return axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/login`,
      { code: urlCode },
      { withCredentials: true }
    )
    .then((res) => {
      // const expiresIn = res.data["expiresIn"];
      const access_token = res.data["accessToken"];
      setAccessToken(access_token, 1 / 24);
      // console.log("Expired in:", expiresIn);

      window.history.pushState({}, "", "/dashboard");

      return true;
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      // window.location.href = "/";

      return false;
    });
}
