import useAuth from "../../hooks/useAuth";
import { generateRandomString } from "./GenerateRandomString";

export default function Login() {
  const clientId = "efecfa4580fd46c4aa1a04799c986e1d";
  const redirectURI = "http://localhost:5173/callback";
  const state = generateRandomString(128);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectURI);
  params.append("scope", "user-top-read");
  params.append("state", state);

  const spotifyAuthURL = `https://accounts.spotify.com/authorize?${params.toString()}`;
  window.location.href = spotifyAuthURL;

  const accessToken = useAuth();
  if (accessToken) console.log("Login, access token: ", accessToken);
}
