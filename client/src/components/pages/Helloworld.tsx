import { Background, Parallax } from 'react-parallax';
// import img from "../../assets/spotify_logo_with_text.svg";

export default function HelloWorld() {
    return (
        <Parallax strength={1000000}>
            <Background className="custom-bg">
                <img src="https://i.pinimg.com/originals/a5/22/fc/a522fc07c82ba52661fc4877a310ced7.jpg" alt="fill murray" />
            </Background>
        </Parallax>
    );
};