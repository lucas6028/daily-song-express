import axios from "axios";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/cookieUtils";

export default function Profile() {
    const [profile, setProfile] = useState({ name: "Guest", imgUrl: "https://placehold.jp/150x150.png" });
    const access_token = getAccessToken();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/profile`, {
                    access_token: access_token,
                });
                const newProfile = {
                    name: res.data.body["display_name"],
                    imgUrl: res.data.body.images[0].url,
                }
                setProfile(newProfile);
            } catch (err) {
                console.error("Error while get user profile: " + err);
            }
        }

        fetchProfile();
    }, [access_token]);

    return (
        <>
            <p>Welcome, {profile.name ? profile.name : "Guest"}</p>
            <img src={profile.imgUrl} alt="Profile Picture" />
        </>
    )
}
