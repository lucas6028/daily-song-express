import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Image } from 'react-bootstrap';

function NavScroll() {
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
                        <Nav.Link href="#deets">Sign out</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Contact me
                        </Nav.Link>
                        <Nav.Link>
                            <Image
                                src="https://placehold.jp/30x30.png"
                                roundedCircle
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScroll;