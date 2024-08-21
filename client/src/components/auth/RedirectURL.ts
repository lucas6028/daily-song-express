import { generateRandomString } from "./GenerateRandomString";

export default function RedirectURL() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectURI = import.meta.env.VITE_REDIRECT_URI;
  const state = generateRandomString(128);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectURI);
  params.append(
    "scope",
    "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state user-library-read user-library-modify user-top-read"
  );
  params.append("state", state);

  const spotifyAuthURL = `https://accounts.spotify.com/authorize?${params.toString()}`;
  window.location.href = spotifyAuthURL;
}
