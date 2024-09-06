import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAccessToken } from "../../utils/cookieUtils";

export default function Profile() {
    const access_token = getAccessToken();

    const defaultProfile = useMemo(() => ({
        name: "Guest",
        imgUrl: "https://placehold.jp/150x150.png",
        product: "premium",
        id: "",
    }), []);

    const [profile, setProfile] = useState(defaultProfile);

    const fetchProfile = useCallback(async () => {
        if (!access_token) return;

        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/profile`, { access_token });
            const { display_name, images, product, id } = res.data.body;

            setProfile({
                name: display_name || "Guest",
                imgUrl: images?.[1]?.url || "https://placehold.jp/150x150.png",
                product: product || "N/A",
                id: id || "N/A",
            });
        } catch (err) {
            console.error("Error while getting user profile:", err);
        }
    }, [access_token]);

    useEffect(() => {
        if (access_token) fetchProfile();
    }, [fetchProfile, access_token]);

    return (
        <>
            <p>Welcome, {profile.name}</p>
            <p>Subscription: {profile.product}</p>
            <p>User ID: {profile.id}</p>
            <img src={profile.imgUrl} alt="Profile Picture" />
        </>
    );
}
