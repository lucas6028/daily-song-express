import { Fade, Zoom, Slide } from 'react-awesome-reveal';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
// import spotifySvg from '/spotify5.svg';
import brand from "/brand_text.png";

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Zoom triggerOnce>
                <img
                    // src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?202208211253235"
                    src={brand}
                    alt="Spotify experience"
                    className={styles.image}
                />
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
            <Fade triggerOnce>
                <h1 className={styles.heading}>Welcome to Your Spotify Experience</h1>
            </Fade>

            {/* Adding an inline image */}

            <Zoom triggerOnce>
                <p className={styles.text}>
                    Discover your favorite tracks, explore new recommendations, and more!
                </p>
            </Zoom>

        </div>
    );
};

export default Home;
