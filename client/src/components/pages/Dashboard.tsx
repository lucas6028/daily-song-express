import { useState, useEffect } from "react";
import { ButtonGroup, Container, Row, Col } from "react-bootstrap";
import NavigationButton from "../ui/button/NavigationButton";
import Hamster from "../ui/hamster/Hamster";
import NavBar from "../ui/navbar/Navbar";
import axios from "axios";
import "../styles/Dashboard.css";

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/check-token`, { withCredentials: true });

                if (response.data.authenticated) {
                    // User is authenticated (either access token is valid or refreshed)
                    setIsAuthenticated(true);
                    console.log("Already has token!");
                } else {
                    // No access token, no refresh token, or refresh failed
                    console.log(response.data.message);
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                window.location.href = "/login";
            }
        };

        checkAuth();
    }, []);

    if (!isAuthenticated) {
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
