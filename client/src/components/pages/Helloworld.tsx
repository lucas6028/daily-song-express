import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HelloWorld: React.FC = () => {
    return (
        <Container fluid className="bg-dark text-light min-vh-100 d-flex flex-column justify-content-center">
            <Row className="text-center mb-5">
                <Col>
                    <h1 className="display-2 fw-bold mb-4">Discover Your Sound</h1>
                    <p className="lead">Explore your top tracks and get personalized recommendations</p>
                </Col>
            </Row>

            <Row className="text-center mb-5">
                <Col md={4} className="mb-4 mb-md-0">
                    <div className="icon-wrapper text-primary mb-3">
                        <i className="bi bi-music-note-beamed" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h3>Your Top Tracks</h3>
                    <p>See what you've been listening to most</p>
                </Col>
                <Col md={4} className="mb-4 mb-md-0">
                    <div className="icon-wrapper text-success mb-3">
                        <i className="bi bi-headphones" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h3>Recommended Tracks</h3>
                    <p>Discover new music based on your taste</p>
                </Col>
                <Col md={4}>
                    <div className="icon-wrapper text-danger mb-3">
                        <i className="bi bi-spotify" style={{ fontSize: '2rem' }}></i>
                    </div>
                    <h3>Spotify Integration</h3>
                    <p>Seamlessly connect with your Spotify account</p>
                </Col>
            </Row>

            <Row className="text-center">
                <Col>
                    <Button
                        variant="success"
                        size="lg"
                        href="/dashboard"
                        className="px-5 py-3 fw-bold"
                    >
                        Go to Dashboard
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default HelloWorld;