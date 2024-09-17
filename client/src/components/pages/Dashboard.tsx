import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Hamster from "../ui/hamster/Hamster";
import NavBar from "../ui/navbar/Navbar";
import Footer from "../ui/footer/Footer";
import styles from "../styles/Dashboard.module.css";
// import music from "/music.svg";
import heart from "/heart.svg";
// import goals from "/goals.png"

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/check-token`, { withCredentials: true });

                if (response.data.authenticated) {
                    // User is authenticated (either access token is valid or refreshed)
                    setIsAuthenticated(true);
                } else {
                    // No access token, no refresh token, or refresh failed
                    console.log(response.data.message);
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error checking auth status:", error);
                navigate("/login");
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className={`container mt-4 ${styles.containerHeight}`}>
                <Row className="d-flex justify-content-center align-items-center h-100">
                    <Col md={3} className="mb-5 d-flex justify-content-center">
                        <Card className={styles.card} onClick={() => navigate("/topTracks")}>
                            <div className={styles.iconContainer}>
                                <img src={heart} className={styles.icon} />
                            </div>
                            <Card.Body>
                                <Card.Title>Top Tracks</Card.Title>
                                <Card.Text>Display your favorite tracks recently</Card.Text>
                                <Card.Text>All the songs you loved</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-5 d-flex justify-content-center">
                        <Card className={styles.card} onClick={() => navigate("/daily")}>
                            <div className={styles.iconContainer}>
                                <img src={heart} className={styles.icon} />
                            </div>
                            <Card.Body>
                                <Card.Title>Recommend Tracks</Card.Title>
                                <Card.Text>Display recommend tracks for you</Card.Text>
                                <Card.Text>Base on your favorite</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3} className="mb-5 d-flex justify-content-center">
                        <Card className={styles.card} onClick={() => navigate("/challenge")}>
                            <div className={styles.iconContainer}>
                                <img src={heart} className={styles.icon} />
                            </div>
                            <Card.Body>
                                <Card.Title>Challenge</Card.Title>
                                <Card.Text>Guess the song name and singer</Card.Text>
                                <Card.Text>Explore more songs</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
}
