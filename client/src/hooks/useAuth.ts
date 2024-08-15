import { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Capture the code from the URL
    const urlCode = new URLSearchParams(window.location.search).get("code");

    if (!urlCode) {
      console.error("Authorization code is missing from URL");
      return;
    }

    // Post the authorization code to the server
    axios
      .post("http://localhost:3000/login", { code: urlCode })
      .then((res) => {
        console.log("Received response:", res.data);
        setAccessToken(res.data.accessToken);
        // Optionally, you can store the access token in local storage or state
        window.history.pushState({}, "", "/callback");
      })
      .catch((err) => {
        console.error("Error posting code:", err);
        // Optionally redirect or show an error message
      });
  }, []);

  return accessToken;
}
