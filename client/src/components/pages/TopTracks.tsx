import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../ui/loading/Loading";
import { SpotifyItemsResponse, Track } from "../types";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { GetToken } from "../auth/GetToken";
import SwipeableSlider from "../../ui/swipeable/SwipeableSlider";


function TopTrack() {
    const [searchResults, setSearchResults] = useState<Track[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string>("");
    const [uri, setUri] = useState<string>("");
    const [play, setPlay] = useState<boolean>(false);

    const handleCardClick = (newUri: string) => {
        setUri(newUri);
    }

    useEffect(() => {
        setPlay(true);
    }, [uri]);

    useEffect(() => {
        const fetchTopTracks = async () => {
            try {
                const res = await axios.get<SpotifyItemsResponse>(`${import.meta.env.VITE_SERVER_URL}/track/myTop`);
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

        const fetchToken = async () => {
            try {
                const token = await GetToken();
                setToken(token);
            } catch (err) {
                console.error(err);
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
        <div className="container">
            <h1>Top Tracks</h1>
            <SwipeableSlider items={searchResults} onCardClick={handleCardClick} />
            <br />
            <SpotifyWebPlayer showSaveIcon callback={(state) => {
                if (!state.isPlaying) {
                    setPlay(false);
                }
            }}
                play={play}
                token={token}
                uris={[uri]} />
        </div>
    );
}

export default TopTrack;
