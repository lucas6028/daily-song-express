import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';
import axios from 'axios';

function NavScroll() {
    const handleLogout = async () => {
        try {
            const data = await axios.get(`${import.meta.env.VITE_SERVER_URL}/logout`);
            console.log(data);
            window.location.href = "/";
        } catch (err) {
            console.error("Error while log out: " + err);
        }
    }
    const githubUrl = 'https://github.com/lucas6028/daily-song';
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Daily Song</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Dashboard</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Reference" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href={githubUrl}>Github</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Home</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            About
                        </Nav.Link>
                        <NavDropdown
                            title={
                                <Image
                                    src="https://placehold.jp/150x150.png"
                                    roundedCircle
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                            }
                            id="profile-nav-dropdown"
                        >
                            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#account">Account</NavDropdown.Item>
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/" onClick={() => handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;