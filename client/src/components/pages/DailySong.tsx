import { useEffect, useState } from 'react'
import { SpotifyTracksResponse, Track } from "../types"
import axios from 'axios';
import Loading from '../ui/loading/Loading';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const seedArtists = "01u3qI3xMGFvktXyRSMGRZ";
    const seedGenres = "k-pop";
    const minPopularity = 10;

    useEffect(() => {
        const fetchRecommendTracks = async () => {
            try {
                const res = await axios.get<SpotifyTracksResponse>(`${import.meta.env.VITE_SERVER_URL}/track/recommend`, {
                    params: {
                        // seed_artists: seedArtists,
                        seed_genres: seedGenres,
                        min_popularity: minPopularity,
                    }
                });
                console.log(res);
                const tracks = res.data.body.tracks.map((track) => ({
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
                setError("Fail to fetch recommend tracks");
            } finally {
                setLoading(false);
            }
        }

        fetchRecommendTracks();
    }, [])

    if (loading) {
        return (<Loading></Loading>);
    }
    if (error) {
        return (<p>{error}</p>);
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
    )
}

export default DailySong