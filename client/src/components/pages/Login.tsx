import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import RedirectURL from '../auth/RedirectURL';
import RequestAccess from '../auth/RequestAccess';
import spotifyLogo from '../../assets/Spotify_logo_with_text.svg';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [urlCode, setUrlCode] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const existingCode = new URLSearchParams(window.location.search).get("code");
        if (existingCode) {
            setUrlCode(existingCode);
        }
    }, [])

    useEffect(() => {
        if (urlCode) {
            RequestAccess(urlCode)
                .then(() => {
                    console.log("Login successfully! Redirect to dashboard");
                    navigate("/dashboard");
                })
                .catch((err) => console.error(err));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlCode]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <Card style={{ width: '22rem', textAlign: 'center' }} className="p-4 bg-dark text-white shadow-lg rounded">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <img
                            src={spotifyLogo}
                            alt="Spotify Logo"
                            style={{ width: '150px' }}
                        />
                    </Card.Title>
                    <Button
                        variant="outline-light"
                        className="btn-block mb-3 w-100"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '25px',
                        }}
                        onClick={() => RedirectURL()}
                    >
                        <i className="bi bi-spotify" style={{ marginRight: '8px', fontSize: '24px' }}></i>
                        Sign in with Spotify
                    </Button>
                    <Card.Text className="mt-3">
                        Don't have an account? <a href="/signup" className="text-white">Create one</a>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
