import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";

// Define the structure of the track's artist
interface Artist {
    name: string;
}

// Define the structure of the album's image
interface AlbumImage {
    url: string;
}

// Define the structure of the album
interface Album {
    images: AlbumImage[];
}

// Define the structure of the track item
interface TrackItem {
    artists: Artist[];
    name: string;
    id: string;
    uri: string;
    album: Album;
}

// Define the structure of the API response data
interface SpotifyApiResponse {
    body: {
        items: TrackItem[];
    };
}

// Define the Track type that you'll use in the component state
interface Track {
    artist: string;
    title: string;
    id: string;
    uri: string;
    img: string;
}

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
