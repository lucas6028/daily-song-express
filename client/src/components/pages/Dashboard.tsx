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
        if (sessionStorage.getItem("hasToken") === "yes") {
            setHasToken(true);
            window.history.pushState({}, "", "/dashboard");
            return;
        }
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
                    sessionStorage.setItem("hasToken", "yes");
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [urlCode])

    if (!hasToken) {
        const timeout = setTimeout(() => {
            // location.reload();
            window.location.href = "/dashboard";
        }, 5000);
        clearTimeout(timeout);
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
