import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { GetToken } from '../auth/GetToken';

function Helloworld() {
    const [token, setToken] = useState<string>("");
    const color = "#fff";

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
            <SpotifyPlayer styles={{ trackNameColor: color }} token={token} uris={['spotify:track:58Q3FZFs1YXPpliWQB5kXB']} />
        </>
    )
}

export default Helloworld;
