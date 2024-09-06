import LogInButton from '../ui/button/LogInButton';
import DJImg from '../../assets/DJ.jpg'

function Home() {
    return (
        <>
            <h1>Daily Song</h1>
            <img src={DJImg} alt='DJ.jpg' />
            <LogInButton></LogInButton>
        </>
    );
}
// Photo by Marcela Laskoski on Unsplash
// https://reurl.cc/0dEKq9

export default Home;