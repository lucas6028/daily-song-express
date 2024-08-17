import { useState, useEffect } from "react";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import Profile from "../api/Profile";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);

    useEffect(() => {
        const existingCode = new URLSearchParams(window.location.search).get("code");
        if (!existingCode) {
            // Only redirect if there is no code in the URL
            RedirectURL();
        } else {
            setUrlCode(existingCode);
            console.log("Authorization Code:", existingCode);
        }
    }, []);

    useEffect(() => {
        if (urlCode) {
            console.log("Get the access token");
            RequestAccess(urlCode);
        }
    }, [urlCode])

    return (
        <>
            <h1>Dashboard</h1>
            <Profile></Profile>
        </>
    );
}
