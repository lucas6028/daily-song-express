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
import { compareNames, trimName } from "../../utils/name";

function Challenges() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const [play, setPlay] = useState<boolean>(false);
    const [uri, setUri] = useState<string>("");
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);
    const [selectedTrack, setSelectedTrack] = useState<string>("");
    const [selectedArtists, setSelectedArtists] = useState<string>("");
    const [relatedArtists, setRelatedArtists] = useState<Artist[]>([]);
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
            }
        };

        fetchToken();
        fetchTopArtists();
    }, []);

    useEffect(() => {
        const fetchRelatedArtists = async () => {
            if (artists.length === 0) return;

            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/artist/related`, {
                    params: {
                        id: artists[0].id,
                    },
                });
                const newRelatedArtists: Artist[] = res.data.body.artists.map((art: SpotifyArtistResponse) => ({
                    name: art.name,
                    id: art.id,
                    popularity: art.popularity,
                    uri: art.uri,
                    imgUrl: art.images[1].url,
                }));
                setRelatedArtists(newRelatedArtists);
            } catch (err) {
                console.error("Error while get related artists: " + err);
            }
        };

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
            }
        };

        fetchRelatedArtists();
        fetchArtistTopTracks();
    }, [artists]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimTrackName = trimName(tracks[0].title);
        const trimSelectedTrackName = trimName(selectedTrack);
        if (compareNames(trimTrackName, trimSelectedTrackName)) {
            console.log("The track name is correct!");
        }
        else {
            console.log("The track name is wrong...");
        }

        if (tracks[0].artist === selectedArtists) {
            console.log("The artist name is correct!");
        }
        else {
            console.log("The artist name is wrong...");
        }
        console.log(selectedTrack);
        console.log(selectedArtists);
        console.log(tracks[0].title);
        console.log(tracks[0].artist);
    }

    const handleTrackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSelectedTrack(value);
    }

    const handleSingerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setSelectedArtists(value);
    }

    if (!isAuthenticated || artists.length === 0 || relatedArtists.length === 0 || tracks.length === 0) {
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
                    <Form.Label>Song</Form.Label>
                    <Form.Control
                        placeholder="Enter the name of the song..."
                        onChange={handleTrackChange}
                        value={selectedTrack}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSelect">
                    <Form.Label>Singer</Form.Label>
                    <Form.Select value={selectedArtists} onChange={handleSingerChange}>
                        <option value="" disabled hidden>Select and option...</option>
                        <option value={tracks[0].artist}>{tracks[0].artist}</option>
                        <option value={relatedArtists[0].name}>{relatedArtists[0].name}</option>
                        <option value={relatedArtists[1].name}>{relatedArtists[1].name}</option>
                        <option value={relatedArtists[2].name}>{relatedArtists[2].name}</option>
                        <option value={relatedArtists[3].name}>{relatedArtists[3].name}</option>
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