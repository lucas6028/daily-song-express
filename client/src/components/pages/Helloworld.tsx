import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { GetToken } from '../auth/GetToken';

function Helloworld() {
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await GetToken();
                setToken(token);
            } catch (err) {
                console.error(err);
            }
        };

        fetchToken();
    }, []);

    return (
        <>
            <h1>Hello World</h1>
            <SpotifyPlayer token={token} uris={['spotify:artist:6HvZYsbFfjnjFrWF950C9d']} />
        </>
    )
}

export default Helloworld;
