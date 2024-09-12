import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NavBar from "../ui/navbar/Navbar";
import "../styles/Profile.css"
import { useNavigate } from "react-router-dom";
import Loading from "../ui/loading/Loading";

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/check-token`, { withCredentials: true });

                if (response.data.authenticated) {
                    // User is authenticated (either access token is valid or refreshed)
                    setIsAuthenticated(true);
                } else {
                    // No access token, no refresh token, or refresh failed
                    console.log(response.data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                navigate("/login");
            }
        };

        checkAuth();
    }, []);

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

    if (!isAuthenticated) {
        return (
            <Loading />
        )
    }
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
