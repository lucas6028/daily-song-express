import { useState, useEffect } from "react";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import Profile from "../api/Profile";
import NavigationButton from "../ui/button/NavigationButton";
import Hamster from "../ui/hamster/Hamster";
import { ButtonGroup, Container } from "react-bootstrap";

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
            // console.log("Authorization Code:", existingCode);
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
            // window.location.href = "/dashboard";
        }, 5000);
        clearTimeout(timeout);
        return (
            <>
                <Hamster />
                <h2>Loading...</h2>
            </>
        );
    }
    return (
        <Container>
            <h1>Dashboard</h1>
            <Profile></Profile>
            <ButtonGroup vertical>
                <NavigationButton to="/topTracks" className="btn btn-primary">Top Track</NavigationButton>
                <NavigationButton to="/daily" className="btn btn-primary">Daily Song</NavigationButton>
                <NavigationButton to="/challenges" className="btn btn-primary">Challenges</NavigationButton>
            </ButtonGroup>
        </Container>
    );
}
