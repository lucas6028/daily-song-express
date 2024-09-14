import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import Loading from "../ui/loading/Loading";
import SpotifyWebPlayer from "react-spotify-web-playback";
import spotifyPlayerStyles from "../styles/style";
import PlayButton from "../ui/button/PlayButton";
import styles from "../styles/Challenge.module.css";
import { Artist, SpotifyArtistResponse, SpotifyTracksResponse, Track } from "../types";
import NavBar from "../ui/navbar/Navbar";

function Challenges() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [uri, setUri] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<string>("");
    const [selectedSinger, setSelectedSinger] = useState<string>("");
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

        const fetchTopArtists = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/artist/myTop`, {
                    params: {
                        limit: 1,
                        offset: Math.floor(Math.random() * 51)
                    },
                    withCredentials: true
                });
                const newArtists: Artist[] = res.data.body.items.map((art: SpotifyArtistResponse) => ({
                    name: art.name,
                    id: art.id,
                    popularity: art.popularity,
                    uri: art.uri,
                    imgUrl: art.images[1].url,
                }));
                setArtists(newArtists);
            } catch (err) {
                console.error('Error while fetching top artists: ' + err);
                setError('Failed to fetch top artists');
                setLoading(false);
            }
        };

        fetchToken();
        fetchTopArtists();
    }, []);

    useEffect(() => {
        const fetchArtistTopTracks = async () => {
            if (artists.length === 0) return;

            try {
                const res = await axios.get<SpotifyTracksResponse>(
                    `${import.meta.env.VITE_SERVER_URL}/artist/topTracks`,
                    {
                        params: {
                            id: artists[0].id,
                            market: "TW",
                        },
                        withCredentials: true
                    }
                );
                const newTracks: Track[] = res.data.body.tracks.map((track) => ({
                    albumName: track.album.name,
                    albumUri: track.album.uri,
                    artist: track.artists[0].name,
                    artistUri: track.artists[0].uri,
                    title: track.name,
                    id: track.id,
                    trackUri: track.uri,
                    img: track.album.images[1].url,
                }));

                setTracks(newTracks);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recommended tracks');
            } finally {
                setLoading(false);
            }
        };

        fetchArtistTopTracks();
    }, [artists]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(selectedTrack);
        console.log(selectedSinger);
        console.log(tracks[0].title);
        console.log(tracks[0].artist);
    }

    const handleTrackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedTrack(value);
    }

    const handleSingerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedSinger(value);
    }

    if (!isAuthenticated || loading) {
        return (
            <Loading />
        )
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavBar />
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Track</Form.Label>
                    <Form.Select value={selectedTrack} onChange={handleTrackChange}>
                        <option value="" disabled hidden>Select and option...</option>
                        <option value={tracks[0].title}>{tracks[0].title}</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSelect">
                    <Form.Label>Singer</Form.Label>
                    <Form.Select value={selectedSinger} onChange={handleSingerChange}>
                        <option value="" disabled hidden>Select and option...</option>
                        <option value={tracks[0].artist}>{tracks[0].artist}</option>
                        <option value="b">b</option>
                        <option value="c">c</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <PlayButton onClick={() => { setUri(tracks[0].trackUri) }} />
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