import { Carousel, Card, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Artist, SpotifyArtistResponse, SpotifyTracksResponse, Track } from '../types';
import axios from 'axios';
import Loading from '../ui/loading/Loading';
import PlayButton from '../ui/button/PlayButton';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    const minPopularity = 10;

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/artist/myTop`, {
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
    }, [artists]); // Include artists in the dependency array

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <>
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
                                            <PlayButton />
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </>
    );
}

export default DailySong;
