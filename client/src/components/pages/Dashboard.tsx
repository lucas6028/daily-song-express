import { useState, useEffect } from "react";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

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
            const newAccessToken = RequestAccess(urlCode);
            if (newAccessToken) {
                setAccessToken(newAccessToken);
            }
        }
    }, [urlCode])

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Access Token: {accessToken ? accessToken : "Loading..."}</p>
        </div>
    );
}
