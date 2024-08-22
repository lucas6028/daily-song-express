import axios from "axios";

export const GetToken = async (): Promise<string> => {
  try {
    const { data } = await axios.get<string>(
      `${import.meta.env.VITE_SERVER_URL}/login/token`
    );
    console.log("Access token: ", data);
    return data;
  } catch (err) {
    console.error("Error while getting access token: ", err);
    throw err;
  }
};
