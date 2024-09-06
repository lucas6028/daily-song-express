import axios from "axios";

export default function RequestAccess(urlCode: string): Promise<boolean> {
  console.log(`server url: ${import.meta.env.VITE_SERVER_URL}/login`);
  if (!urlCode) {
    console.error("Authorization code is missing from URL");
    return Promise.resolve(false); // Return a resolved Promise with `false`;
  }

  return axios
    .post(
      `${import.meta.env.VITE_SERVER_URL}/login`,
      { code: urlCode },
      { withCredentials: true }
    )
    .then((res) => {
      console.log(res.data);

      window.history.pushState({}, "", "/dashboard");

      return true;
    })
    .catch((err) => {
      console.error("Error posting code:", err);
      // window.location.href = "/";

      return false;
    });
}
