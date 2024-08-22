import axios from 'axios';
import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

function Helloworld() {
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const { data } = await axios.get<string>(`${import.meta.env.VITE_SERVER_URL}/login/token`);
                console.log("access token: ", data);
                setToken(data);
            } catch (err) {
                console.error("Error while getting access token: " + err);
            }
        };

        fetchToken();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <>
            <h1>Hello World</h1>
            <SpotifyPlayer token={token} uris={['spotify:artist:6HvZYsbFfjnjFrWF950C9d']} />
        </>
    )
}

export default Helloworld;
