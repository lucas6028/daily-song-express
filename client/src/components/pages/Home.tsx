import { Zoom, Slide } from 'react-awesome-reveal';
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import brand from "/large_icon.png";
import HomeButton from '../ui/button/HomeButton';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <Zoom triggerOnce>
                <img
                    src={brand}
                    alt="Daily Song"
                    className={styles.image}
                />
            </Zoom>
            <Slide direction="up" triggerOnce>
                <HomeButton onClick={() => navigate("/dashboard")} />
            </Slide>

            <Zoom triggerOnce>
                <p className={styles.text}>
                    Discover your favorite tracks, explore new recommendations, and more!
                </p>
            </Zoom>
        </div>
    );
};

export default Home;
