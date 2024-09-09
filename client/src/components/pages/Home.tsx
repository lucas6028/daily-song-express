import LogInButton from '../ui/button/LogInButton';
import DJImg from '../../assets/DJ.jpg';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RequestAccess from '../auth/RequestAccess';
import RedirectURL from '../auth/RedirectURL';

function Home() {
    const [urlCode, setUrlCode] = useState<string | null>(null);

    const handleLoginClick = () => {
        const fetchToken = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_SERVER_URL}/login/token`, { withCredentials: true });
                window.location.href = "/dashboard";
            } catch {
                const existingCode = new URLSearchParams(window.location.search).get("code");
                if (!existingCode) {
                    RedirectURL();
                } else {
                    setUrlCode(existingCode);
                }
            }
        };
        fetchToken();
    }

    useEffect(() => {
        if (urlCode) {
            RequestAccess(urlCode)
                .then(() => window.location.href = "/dashboard")
                .catch((err) => console.error(err));
        }
    }, [urlCode]);

    return (
        <div className="home-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="home-title">Daily Song</h1>
            <img className="home-image" src={DJImg} alt='DJ' />
            <LogInButton onClick={handleLoginClick} />
        </div>
    );
}

export default Home;
