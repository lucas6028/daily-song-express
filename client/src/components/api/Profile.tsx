import axios from "axios";
import { useState } from "react";

export default function Profile() {
    const [userName, setUserName] = useState<string | null>(null);

    axios
        .get(import.meta.env.VITE_SERVER_URL + "/profile")
        .then((data) => {
            console.log(data.data.body["display_name"]);
            setUserName(data.data.body["display_name"]);
        })
        .catch((err) => {
            console.error(err);
        });

    return (
        <p>Welcome, {userName ? userName : "Guest"}</p>
    )
}
