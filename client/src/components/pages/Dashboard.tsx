import { useState, useEffect } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import NavigationButton from "../ui/button/NavigationButton";
import Hamster from "../ui/hamster/Hamster";
import NavBar from "../ui/navbar/Navbar";
import axios from "axios";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const [hasToken, setHasToken] = useState<boolean>(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/token`, { withCredentials: true });
                setHasToken(true);
            } catch (err) {
                console.error("Error while get token: " + err);
                const existingCode = new URLSearchParams(window.location.search).get("code");
                if (!existingCode) {
                    // Only redirect if there is no code in the URL
                    RedirectURL();
                    setHasToken(true);
                } else {
                    setUrlCode(existingCode);
                }
            }
        }

        fetchToken();
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
        <>
            <NavBar />
            <Container>
                <h1>Dashboard</h1>
                <ButtonGroup vertical>
                    <NavigationButton to="/topTracks" className="btn btn-primary">Top Track</NavigationButton>
                    <NavigationButton to="/daily" className="btn btn-primary">Daily Song</NavigationButton>
                    <NavigationButton to="/challenges" className="btn btn-primary">Challenges</NavigationButton>
                </ButtonGroup>
            </Container>
        </>
    );
}
