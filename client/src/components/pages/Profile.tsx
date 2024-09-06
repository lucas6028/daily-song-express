import axios from "axios";
import { useState } from "react";

export default function Profile() {
    const [userName, setUserName] = useState<string | null>(null);
    const [imgUrl, setImgUrl] = useState("");

    axios
        .get(`${import.meta.env.VITE_SERVER_URL}/profile`)
        .then((data) => {
            // console.log(data);
            setUserName(data.data.body["display_name"]);
            setImgUrl(data.data.body.images[0].url);
        })
        .catch((err) => {
            console.error(err);
        });

    return (
        <>
            <p>Welcome, {userName ? userName : "Guest"}</p>
            <img src={imgUrl} alt="Profile Picture" />
        </>
    )
}
