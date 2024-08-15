import { useEffect } from "react";
import axios from "axios";

export default function useAuth(code: string) {
  useEffect(() => {
    if (!code) {
      console.log("Authorization code is missing");
      return;
    }

    axios
      .post("http://localhost:3000/login", { code })
      .then((res) => {
        console.log("Received response:", res.data);
        // Handle the tokens received here, e.g., store in state or context
      })
      .catch((err) => {
        console.error("Error posting code:", err);
        // Optionally redirect or show an error message
        // window.location.href = "/";
      });
  }, [code]);
}
