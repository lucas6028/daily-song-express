import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Artist, SpotifyArtistResponse, SpotifyTracksResponse, Track } from '../types';
import axios from 'axios';
import Loading from '../ui/loading/Loading';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import PlayButton from '../ui/button/PlayButton';
import NavScroll from '../ui/navbar/Navbar';
import Cookies from 'js-cookie';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [uri, setUri] = useState<string>("");
    const [play, setPlay] = useState<boolean>(false);
    const [artists, setArtists] = useState<Artist[]>([]);
    const access_token = Cookies.get("access_token");
    const minPopularity = 10;

    const handleCardCLick = (newUri: string) => {
        setUri(newUri);
    }

    useEffect(() => {
        setPlay(true);
    }, [uri])

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/artist/myTop`, {
                    access_token: access_token,
                    limit: 1,
                    offset: Math.floor(Math.random() * 21),
                });
                console.log(res);
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

        fetchTopArtists();
    }, [access_token]);

    useEffect(() => {
        const fetchRecommendTracks = async () => {
            if (artists.length === 0) return;

            try {
                const res = await axios.post<SpotifyTracksResponse>(
                    `${import.meta.env.VITE_SERVER_URL}/track/recommend`,
                    {
                        access_token: access_token,
                        limit: 10,
                        seed_artists: artists[0].id,
                        // seed_genres: seedGenres,
                        min_popularity: minPopularity,
                    }
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
    }, [artists, access_token]); // Include artists in the dependency array

    if (loading) {
        return <Loading />;
    }
    if (error || access_token === undefined) {
        return <p>{error}</p>;
    }
    return (
        <>
            <NavScroll />
            <Container className="my-1">
                <Carousel>
                    {searchResults.map((track) => (
                        <Carousel.Item key={track.id}>
                            <Row className="justify-content-center">
                                <Col xs={12} md={6}>
                                    <Card className="bg-secondary bg-gradient text-dark">
                                        <Card.Img variant="top" src={track.img} />
                                        <Card.Body>
                                            <Card.Title>{track.title}</Card.Title>
                                            <Card.Text>{track.artist}</Card.Text>
                                            {/* <Button onClick={() => handleCardCLick(track.trackUri)} className="btn btn-primary">Play</Button> */}
                                            <PlayButton onClick={() => handleCardCLick(track.trackUri)} />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
            <SpotifyWebPlayer callback={(state) => {
                if (!state.isPlaying) {
                    setPlay(false);
                }
            }}
                play={play}
                token={access_token}
                uris={[uri]} />
        </>
    );
}

export default DailySong;
