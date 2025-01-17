import { Image, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { handleLogout } from '../../api/Logout';
import axios from 'axios';
import logo from "/small_icon.png";
// import logo from "/medium_icon.png";

function NavBar() {
    const [profileImg, setProfileImg] = useState<string>("https://placehold.jp/150x150.png");
    const githubUrl = 'https://github.com/lucas6028/daily-song';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/profile`, { withCredentials: true });
                setProfileImg(res.data.body.images[0].url);
            } catch (err) {
                console.error("Error while get user profile" + err);
            }
        }

        fetchProfile();
    }, [])

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top"
                        alt="Daily Song Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/topTracks">Top Tracks</Nav.Link>
                        <Nav.Link href="/daily">Daily</Nav.Link>
                        <Nav.Link href="/challenge">Challenge</Nav.Link>
                        <NavDropdown title="Reference" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href={githubUrl}>Github</NavDropdown.Item>
                            <NavDropdown.Item href="https://spotify.com">Spotify</NavDropdown.Item>
                            <NavDropdown.Item href="https://developer.spotify.com/">
                                Spotify for Developer
                            </NavDropdown.Item>
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
                                    src={profileImg}
                                    roundedCircle
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                            }
                            id="profile-nav-dropdown"
                        >
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#account">Account</NavDropdown.Item>
                            <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/login" onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;