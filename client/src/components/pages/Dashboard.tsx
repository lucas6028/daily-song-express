import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Hamster from "../ui/hamster/Hamster";
import NavBar from "../ui/navbar/Navbar";
import axios from "axios";
// import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Footer from "../ui/footer/Footer";

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
            <div className="container mt-4">
                <Row>
                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title 1</Card.Title>
                                <Card.Text>
                                    This is a card example with some sample text for card 1.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title 2</Card.Title>
                                <Card.Text>
                                    This is a card example with some sample text for card 2.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="mb-3">
                        <Card>
                            <Card.Img variant="top" src="https://via.placeholder.com/150" />
                            <Card.Body>
                                <Card.Title>Card Title 3</Card.Title>
                                <Card.Text>
                                    This is a card example with some sample text for card 3.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <Footer />
        </>
    );
}
