import { useEffect, useState } from 'react';
import { Artist, SpotifyArtistResponse, SpotifyTracksResponse, Track } from '../types';
import axios from 'axios';
import Loading from '../ui/loading/Loading';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [artists, setArtists] = useState<Artist[]>([]);
    // const seedGenres = "k-pop";
    const minPopularity = 10;

    useEffect(() => {
        const fetchTopArtists = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/artist/myTop`);
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
                const res = await axios.get<SpotifyTracksResponse>(
                    `${import.meta.env.VITE_SERVER_URL}/track/recommend`,
                    {
                        params: {
                            seed_artists: artists[1].id,
                            // seed_genres: seedGenres,
                            min_popularity: minPopularity,
                        },
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
            <h1>Daily Song</h1>
            <div>
                {searchResults.map((track) => (
                    <div key={track.id}>
                        <img src={track.img} alt={track.title}></img>
                        <div>
                            <p>{track.title}</p>
                            <p>{track.artist}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default DailySong;
