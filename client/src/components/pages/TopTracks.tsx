import axios from "axios";
import { Carousel, Container, Card, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from "react";
import Loading from "../ui/loading/Loading";
import { SpotifyItemsResponse, Track } from "../types";
import SpotifyWebPlayer from "react-spotify-web-playback";
import PlayButton from "../ui/button/PlayButton";
import NavBar from "../ui/navbar/Navbar";

function TopTrack() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uri, setUri] = useState<string>("");
    const [play, setPlay] = useState<boolean>(false);
    const [access_token, setAccessToken] = useState<string | null>(null);

    const handleCardClick = (newUri: string) => {
        setUri(newUri);
    }

    useEffect(() => {
        setPlay(true);
    }, [uri]);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/token`, { withCredentials: true });
                console.log(res.data);
                setAccessToken(res.data);
            } catch (err) {
                console.error("Error while get token: " + err);
            }
        }
        const fetchTopTracks = async () => {
            try {
                const res = await axios.post<SpotifyItemsResponse>(`${import.meta.env.VITE_SERVER_URL}/track/myTop`, {
                    limit: 10,
                }, {
                    withCredentials: true
                });
                const tracks = res.data.body.items.map((track) => ({
                    albumName: track.album.name,
                    albumUri: track.album.uri,
                    img: track.album.images[1].url,
                    artist: track.artists[0].name,
                    artistUri: track.artists[0].uri,
                    title: track.name,
                    id: track.id,
                    trackUri: track.uri,
                }));
                setSearchResults(tracks);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch top tracks.");
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
        fetchTopTracks();
    }, []);

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <NavBar />
            <Container className="my-1">
                <Carousel>
                    {searchResults.map((track) => (
                        <Carousel.Item key={track.id}>
                            <Row className="justify-content-center">
                                <Col xs={10} sm={8} md={6} lg={4}>
                                    <Card className="bg-secondary bg-gradient text-dark">
                                        <Card.Img variant="top" src={track.img} />
                                        <Card.Body>
                                            <Card.Title>{track.title}</Card.Title>
                                            <Card.Text>{track.artist}</Card.Text>
                                            {/* <Button onClick={() => handleCardCLick(track.trackUri)} className="btn btn-primary">Play</Button> */}
                                            <PlayButton onClick={() => handleCardClick(track.trackUri)} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
            {access_token ?
                <SpotifyWebPlayer showSaveIcon callback={(state) => {
                    if (!state.isPlaying) {
                        setPlay(false);
                    }
                }}
                    play={play}
                    token={access_token}
                    uris={[uri]}
                    initialVolume={50} />
                :
                <p>No token</p>
            }
        </>
    );
}

export default TopTrack;
