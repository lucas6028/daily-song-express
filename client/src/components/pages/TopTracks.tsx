import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import { SpotifyApiResponse, Track } from "../Types";


function TopTrack() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const res = await axios.get<SpotifyApiResponse>(`${import.meta.env.VITE_SERVER_URL}/track/myTop`);
                const tracks = res.data.body.items.map((track) => ({
                    artist: track.artists[0].name,
                    title: track.name,
                    id: track.id,
                    uri: track.uri,
                    img: track.album.images[1].url,
                }));
                setSearchResults(tracks);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch top tracks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopTracks();
    }, []);

    if (loading) {
        return <Loading></Loading>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Top Tracks</h1>
            <ul>
                {searchResults.map((track) => (
                    <li key={track.id}>
                        <img src={track.img} alt={track.title} />
                        <div>
                            <p>{track.title}</p>
                            <p>{track.artist}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopTrack;
