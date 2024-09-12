import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Artist, SpotifyArtistResponse, SpotifyTracksResponse, Track } from '../types';
import Loading from '../ui/loading/Loading';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import PlayButton from '../ui/button/PlayButton';
import NavBar from '../ui/navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uri, setUri] = useState<string>("");
    const [play, setPlay] = useState<boolean>(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const [access_token, setAccessToken] = useState<string | null>(null);
    const minPopularity = 10;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
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
    }, []);

    useEffect(() => {
        setPlay(true);
    }, [uri])

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
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/artist/myTop`, {
                    limit: 1,
                    offset: Math.floor(Math.random() * 21),
                }, { withCredentials: true });
                // console.log(res);
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
        const fetchRecommendTracks = async () => {
            if (artists.length === 0) return;

            try {
                const res = await axios.post<SpotifyTracksResponse>(
                    `${import.meta.env.VITE_SERVER_URL}/track/recommend`,
                    {
                        limit: 10,
                        seed_artists: artists[0].id,
                        // seed_genres: seedGenres,
                        min_popularity: minPopularity,
                    },
                    { withCredentials: true }
                );
                console.log(res);
                const tracks: Track[] = res.data.body.tracks.map((track) => ({
                    albumName: track.album.name,
                    albumUri: track.album.uri,
                    artist: track.artists[0].name,
                    artistUri: track.artists[0].uri,
                    title: track.name,
                    id: track.id,
                    trackUri: track.uri,
                    img: track.album.images[1].url,
                }));

                setSearchResults(tracks);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch recommended tracks');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendTracks();
    }, [artists]); // Include artists in the dependency array

    if (!isAuthenticated || loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
            <NavBar />
            <br />
            <Container className="my-1">
                <Carousel>
                    {searchResults.map((track) => (
                        <Carousel.Item key={track.id}>
                            <Row className="justify-content-center">
                                <Col xs={12} md={6} lg={4}>
                                    <Card className="bg-secondary bg-gradient text-dark">
                                        <Card.Img variant="top" src={track.img} />
                                        <Card.Body className="d-flex flex-column align-items-center">
                                            <Card.Title>{track.title}</Card.Title>
                                            <Card.Text>{track.artist}</Card.Text>
                                            <PlayButton onClick={() => setUri(track.trackUri)} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
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
                        loaderColor: '#1DB954', // Use Spotify green for loader
                        sliderColor: '#1DB954', // Spotify green for the slider
                        sliderHandleColor: '#FFF', // White slider handle for better visibility
                        sliderTrackColor: '#555', // Darker track background for contrast
                        sliderHeight: 7,
                        trackArtistColor: '#AAA', // Subtle light gray for artist name
                        trackNameColor: '#FFF', // White track name for visibility
                    }} />
                :
                <p>No token!</p>
            }
        </>
    );
}

export default DailySong;
