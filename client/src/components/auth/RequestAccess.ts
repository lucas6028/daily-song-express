import axios from "axios";

export default function RequestAccess(urlCode: string | null) {
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return;
  }

  // Post the authorization code to the server
  axios
    .post("http://localhost:3000/login", { code: urlCode })
    .then((res) => {
      console.log("Received response:", res.data);
      window.history.pushState({}, "", "/dashboard");
      console.log(res);
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      // Optionally redirect or show an error message
    });

  return null;
}
