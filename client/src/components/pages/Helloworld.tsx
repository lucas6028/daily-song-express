// import axios from "axios"
import SpotifyPlayer from 'react-spotify-web-playback';

function Helloworld() {
    const accessToken = "";
    return (
        <SpotifyPlayer token={accessToken} uris={['spotify:artist:6HvZYsbFfjnjFrWF950C9d']} />
    )
}

export default Helloworld