import NavBar from '../ui/navbar/Navbar'
import Footer from '../ui/footer/Footer'
import { Container } from 'react-bootstrap'


function About() {
    return (
        <>
            <NavBar />
            <Container className='d-flex justify-content-center align-items-center'>
                <p>這是我使用React Typescript 所做的網站</p>
            </Container>
            <Footer />
        </>
    )
}

export default About