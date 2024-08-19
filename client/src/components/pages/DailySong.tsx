import { useEffect, useState } from 'react'
import { SpotifyTracksResponse, Track } from "../Types"
import axios from 'axios';
import Loading from '../loading/Loading';

function DailySong() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendTracks = async () => {
            try {
                const res = await axios.get<SpotifyTracksResponse>(`${import.meta.env.VITE_SERVER_URL}/track/recommend`);
                console.log(res);
                const tracks = res.data.body.tracks.map((track) => ({
                    artist: track.artists[0].name,
                    title: track.name,
                    id: track.id,
                    uri: track.uri,
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
            <ul>
                {searchResults.map((track) => (
                    <li key={track.id}>
                        <img src={track.img} alt={track.title}></img>
                        <div>
                            <p>{track.title}</p>
                            <p>{track.artist}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default DailySong