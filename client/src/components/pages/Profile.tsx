import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Profile.css';
import NavBar from "../ui/navbar/Navbar";

export default function Profile() {
    const defaultProfile = useMemo(() => ({
        name: "Guest",
        imgUrl: "https://placehold.jp/150x150.png",
        product: "N/A",
        id: "N/A",
        followers: 0,
        spotifyUrl: "N/A",
    }), []);

    const [profile, setProfile] = useState(defaultProfile);

    const fetchProfile = useCallback(async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, { withCredentials: true });
            const { display_name, images, product, id, followers, external_urls } = res.data.body;

            setProfile({
                name: display_name || "Guest",
                imgUrl: images?.[1]?.url || "https://placehold.jp/150x150.png",
                product: product || "N/A",
                id: id || "N/A",
                followers: followers.total || 0,
                spotifyUrl: external_urls.spotify || "",
            });
        } catch (err) {
            console.error("Error while getting user profile:", err);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile,]);

    return (
        <>
            <NavBar />
            <div className="profile-container d-flex justify-content-center mt-4">
                <Card className="shadow-lg bg-secondary bg-gradient text-light rounded-3 profile-card" style={{ width: '20rem' }}>
                    <Card.Img className="rounded-circle mx-auto mt-3 profile-img" variant="top" src={profile.imgUrl} alt="Profile Picture" />
                    <Card.Body className="text-center">
                        <Card.Title className="mb-2">{profile.name}</Card.Title>
                        <Card.Text className="mb-3">
                            <ul className="list-unstyled">
                                <li><strong>Subscription:</strong> {profile.product}</li>
                                <li><strong>Followers:</strong> {profile.followers}</li>
                            </ul>
                        </Card.Text>
                        <Button className="spotify-btn" variant="success" href={profile.spotifyUrl} target="_blank" rel="noopener noreferrer">
                            View on Spotify
                        </Button>
                    </Card.Body >
                </Card >
            </div>
        </>
    );
}
