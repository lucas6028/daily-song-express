// import LogInButton from '../ui/button/LogInButton';
// import "../styles/Home.css";
import React from 'react';
import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Fade triggerOnce>
                <h1 className={styles.heading}>Welcome to Your Spotify Experience</h1>
            </Fade>

            {/* Adding an inline image */}
            <Zoom triggerOnce>
                <img
                    src="https://store-images.s-microsoft.com/image/apps.10546.13571498826857201.6603a5e2-631f-4f29-9b08-f96589723808.dc893fe0-ecbc-4846-9ac6-b13886604095" // Replace with your image URL
                    alt="Spotify experience"
                    className={styles.image}
                />
            </Zoom>

            <Zoom triggerOnce>
                <p className={styles.text}>
                    Discover your favorite tracks, explore new recommendations, and more!
                </p>
            </Zoom>

            <Slide direction="up" triggerOnce>
                <Button
                    href="/dashboard"
                    variant="success"
                    size="lg"
                    // className={styles.button}
                    onClick={() => navigate("/dashboard")}
                >
                    Go to Dashboard
                </Button>
            </Slide>
        </div>
    );
};

export default Home;
