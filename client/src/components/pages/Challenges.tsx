import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loading from "../ui/loading/Loading";
import SpotifyWebPlayer from "react-spotify-web-playback";

function Challenges() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [uri, setUri] = useState<string>("spotify:track:19D8LNpWwIPpi6hs9BG7dq");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/check-token`, { withCredentials: true });

                if (response.data.authenticated) {
                    // User is authenticated (either access token is valid or refreshed)
                    setIsAuthenticated(true);
                } else {
                    // No access token, no refresh token, or refresh failed
                    console.log(response.data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                navigate("/login");
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/token`, { withCredentials: true });
                setAccessToken(res.data);
            } catch (err) {
                console.error("Error while get token: " + err);
            }
        }
        fetchToken();
    }, []);

    if (!isAuthenticated) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <h1>Challenge</h1>
            <div style={{ visibility: "hidden" }}>
                {access_token ?
                    <SpotifyWebPlayer callback={(state) => {
                        if (!state.isPlaying) {
                            setPlay(false);
                        }
                    }}
                        showSaveIcon
                        play={play}
                        token={access_token}
                        uris={[uri]}
                        initialVolume={50}
                        styles={{
                            height: 50,
                            activeColor: '#1DB954', // Bright Spotify green for active elements
                            bgColor: 'transparent',
                            // bgColor: '#333',
                            // bgColor: 'linear-gradient(135deg, #333, #444)', // Gradient for background to add depth
                            color: '#FFF', // Keep text white for good contrast
                            loaderColor: 'transparent', // Use Spotify green for loader
                            sliderColor: 'transparent', // Spotify green for the slider
                            sliderHandleColor: 'transparent', // White slider handle for better visibility
                            sliderTrackColor: '#transparent', // Darker track background for contrast
                            sliderHeight: 7,
                            trackArtistColor: 'transparent', // Subtle light gray for artist name
                            trackNameColor: 'transparent', // White track name for visibility
                        }} />
                    :
                    <p>No token</p>
                }
            </ div>
        </>
    )
}

export default Challenges;