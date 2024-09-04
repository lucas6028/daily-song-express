import spotifyAPI from "../config/spotifyConfig";

function RefreshToken() {
  spotifyAPI
    .refreshAccessToken()
    .then((data) => {
      console.log("The access token has been refreshed!");

      // Save the access token so that it's used in future calls
      spotifyAPI.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log("Could not refresh access token", err);
    });
}
export default RefreshToken;
