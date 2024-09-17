import { Zoom, Slide } from 'react-awesome-reveal';
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import brand from "/medium_icon.png";
import HomeButton from '../ui/button/HomeButton';
import Footer from '../ui/footer/Footer';

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
                    Display top tracks, recommend tracks, and daily challenge
                </p>
            </Zoom>
            <Footer />
        </div>
    );
};

export default Home;
