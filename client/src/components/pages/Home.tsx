// import LogInButton from '../ui/button/LogInButton';
import "../styles/Home.css";
import React from 'react';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={styles.container}>
            <Fade triggerOnce>
                <h1 style={styles.heading}>Welcome to Your Spotify Experience</h1>
            </Fade>

            {/* Adding an inline image */}
            <Zoom triggerOnce>
                <img
                    src="https://store-images.s-microsoft.com/image/apps.10546.13571498826857201.6603a5e2-631f-4f29-9b08-f96589723808.dc893fe0-ecbc-4846-9ac6-b13886604095" // Replace with your image URL
                    alt="Spotify experience"
                    style={styles.image}
                />
            </Zoom>

            <Zoom triggerOnce>
                <p style={styles.text}>
                    Discover your favorite tracks, explore new recommendations, and more!
                </p>
            </Zoom>

            <Slide direction="up" triggerOnce>
                <Button
                    href="/dashboard"
                    variant="success"
                    size="lg"
                    style={styles.button}
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </Slide>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh', // Full height of the viewport
        width: '100vw',  // Full width of the viewport
        backgroundImage: 'url("https://dimg.wavevisual.com/v3/von-sample-2.png?width=3840")', // Background image URL
        backgroundSize: 'cover',   // Ensures the background image covers the entire screen
        backgroundPosition: 'center', // Centers the background image
        backgroundRepeat: 'no-repeat', // No repeating of the image
        margin: 0,
        padding: 0,
        color: '#fff',
        textAlign: 'center',
    },
    heading: {
        fontSize: '3rem',
        marginBottom: '20px',
        color: '#000',
    },
    text: {
        fontSize: '1.5rem',
        marginBottom: '40px',
        color: '#000',
    },
    button: {
        fontSize: '1.2rem',
    },
    image: {
        width: '150px', // Adjust size as needed
        marginBottom: '30px',
        background: 'transparent',
    },
};

export default Home;
