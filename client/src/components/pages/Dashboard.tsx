import { useState, useEffect } from "react";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import Profile from "../api/Profile";
import Loading from "../loading/Loading";
import NavigationButton from "../button/NavigationButton";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const [hasToken, setHasToken] = useState(false);

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
            RequestAccess(urlCode)
                .then((res: boolean) => {
                    setHasToken(res);
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [urlCode])

    if (!hasToken) {
        return (
            <Loading></Loading>
        );
    }
    return (
        <>
            <h1>Dashboard</h1>
            <Profile></Profile>
            <div className="container">
                <NavigationButton to="/topTracks">Top Track</NavigationButton>
                <NavigationButton to="/daily">Daily Song</NavigationButton>
                <NavigationButton to="/challenges">Challenges</NavigationButton>
            </div>
        </>
    );
}
