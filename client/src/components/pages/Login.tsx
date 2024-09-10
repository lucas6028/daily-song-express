import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import RedirectURL from '../auth/RedirectURL';
import RequestAccess from '../auth/RequestAccess';

const Login: React.FC = () => {
    const [urlCode, setUrlCode] = useState<string | null>(null);

    const handleLoginClick = () => {
        RedirectURL();
    };

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
                    window.location.href = "/dashboard";
                })
                .catch((err) => console.error(err));
        }
    }, [urlCode]);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <Card style={{ width: '22rem', textAlign: 'center' }} className="p-4 bg-dark text-white shadow-lg rounded">
                <Card.Body>
                    <Card.Title className="mb-4">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
                            alt="Spotify Logo"
                            style={{ width: '150px' }}
                        />
                    </Card.Title>
                    <Button
                        variant="outline-light"
                        className="btn-block mb-3"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            fontSize: '16px',
                            borderRadius: '25px',
                        }}
                        onClick={handleLoginClick}
                    // href="/dashboard"
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