import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import axios from 'axios';
import Loading from "../ui/loading/Loading";
import SpotifyWebPlayer from "react-spotify-web-playback";
import spotifyPlayerStyles from "../styles/style";
import PlayButton from "../ui/button/PlayButton";
import styles from "../styles/Challenge.module.css";

function Challenges() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [uri, setUri] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setPlay(true);
    }, [uri]);

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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <PlayButton onClick={() => { setUri("spotify:track:19D8LNpWwIPpi6hs9BG7dq") }} />
                </Card.Body>
            </Card>
            <Button className="primary" onClick={() => setIsVisible(!isVisible)}>Show</Button>
            <div className={isVisible ? styles.visible : styles.hidden}>
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
                        styles={spotifyPlayerStyles} />
                    :
                    <p>No token</p>
                }
            </ div>
        </>
    )
}

export default Challenges;