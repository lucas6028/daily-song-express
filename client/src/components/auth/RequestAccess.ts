import axios from "axios";

export default function RequestAccess(urlCode: string) {
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return;
  }

  // Post the authorization code to the server
  axios
    .post("http://localhost:3000/login", { code: urlCode })
    .then((res) => {
      const expiresIn = res.data;
      console.log("Expired in:", expiresIn);
      window.history.pushState({}, "", "/dashboard");
      return expiresIn;
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      window.location.href = "/";
    });

  return null;
}
