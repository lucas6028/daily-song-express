import { useState, useEffect } from 'react';

function WebPlayback(props) {
    const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        // Cleanup: remove script if component unmounts
        return () => {
            document.body.removeChild(script);
            if (player) {
                player.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (window.Spotify) {
            const playerInstance = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(playerInstance);

            playerInstance.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            playerInstance.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            playerInstance.addListener('initialization_error', ({ message }) => {
                console.error('Failed to initialize', message);
            });

            playerInstance.addListener('authentication_error', ({ message }) => {
                console.error('Failed to authenticate', message);
            });

            playerInstance.addListener('account_error', ({ message }) => {
                console.error('Failed to validate Spotify account', message);
            });

            playerInstance.addListener('playback_error', ({ message }) => {
                console.error('Failed to perform playback', message);
            });

            playerInstance.connect();

            // Cleanup: disconnect player if component unmounts
            return () => {
                playerInstance.disconnect();
            };
        }
    }, [props.token]);

    return (
        <div className="container">
            <div className="main-wrapper">
                {/* Your UI elements here */}
            </div>
        </div>
    );
}

export default WebPlayback;
