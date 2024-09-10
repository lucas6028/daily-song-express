import LogInButton from '../ui/button/LogInButton';
import DJImg from '../../assets/DJ.jpg';
import "../styles/Home.css";

function Home() {

    return (
        <div className="home-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="home-title">Daily Song</h1>
            <img className="home-image" src={DJImg} alt='DJ' />
            <LogInButton onClick={() => window.location.href = "/dashboard"} />
        </div>
    );
}

export default Home;
