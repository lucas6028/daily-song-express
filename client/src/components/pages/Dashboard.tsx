import { useState, useEffect } from "react";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import RefreshToken from "../auth/RefreshToken";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const [expiresIn, setExpiresIn] = useState<number | null>(null);

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
            const newExpiresIn = RequestAccess(urlCode);
            if (newExpiresIn) {
                setExpiresIn(newExpiresIn);
            }
            const timeout = setInterval(() => {
                RefreshToken();
            }, (2 * 1000));
            return () => clearTimeout(timeout);
        }
    }, [urlCode])

    return (
        <div>
            <h1>Dashboard</h1>
            {expiresIn && <p>Token expires in: {expiresIn} seconds</p>}
        </div>
    );
}
