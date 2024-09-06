import { useState, useEffect } from "react";
import { ButtonGroup, Container, Row, Col } from "react-bootstrap";
import RedirectURL from "../auth/RedirectURL";
import RequestAccess from "../auth/RequestAccess";
import NavigationButton from "../ui/button/NavigationButton";
import Hamster from "../ui/hamster/Hamster";
import NavBar from "../ui/navbar/Navbar";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const [hasToken, setHasToken] = useState<boolean>(false);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/token`, { withCredentials: true });
                setHasToken(true);
            } catch (err) {
                console.error("Error while getting token: " + err);
                const existingCode = new URLSearchParams(window.location.search).get("code");
                if (!existingCode) {
                    RedirectURL();
                    setHasToken(true);
                } else {
                    setUrlCode(existingCode);
                }
            }
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (urlCode) {
            RequestAccess(urlCode)
                .then((res: boolean) => setHasToken(res))
                .catch((err) => console.error(err));
        }
    }, [urlCode]);

    if (!hasToken) {
        const timeout = setTimeout(() => {
            // location.reload();
        }, 5000);
        clearTimeout(timeout);
        return (
            <div className="loading-screen d-flex flex-column align-items-center">
                <Hamster />
                <h2 className="loading-text">Loading...</h2>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <Container className="dashboard-container d-flex justify-content-center align-items-center">
                <Row className="text-center">
                    <Col>
                        <h1 className="dashboard-title">Dashboard</h1>
                        <ButtonGroup vertical className="dashboard-buttons">
                            <NavigationButton to="/topTracks" className="btn btn-primary custom-btn">
                                Top Tracks
                            </NavigationButton>
                            <NavigationButton to="/daily" className="btn btn-primary custom-btn">
                                Daily Song
                            </NavigationButton>
                            <NavigationButton to="/challenges" className="btn btn-primary custom-btn">
                                Challenges
                            </NavigationButton>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
