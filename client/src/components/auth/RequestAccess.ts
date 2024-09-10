import axios from "axios";

export default async function RequestAccess(urlCode: string) {
  console.log(`server url: ${import.meta.env.VITE_SERVER_URL}/login`);
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return;
  }

  await axios
    .get(`${import.meta.env.VITE_SERVER_URL}/login`, {
      params: {
        code: urlCode,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data);

      window.history.pushState({}, "", "/login");

      return true;
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      // window.location.href = "/";

      return false;
    });
}
