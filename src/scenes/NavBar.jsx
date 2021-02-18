import React from 'react' 
import { Navbar, Nav } from 'react-bootstrap'

function NavBar() {

    return(
    <>
    <Navbar bg="light" variant="light">
        <Navbar.Brand href="/Welcome">
        <img
            alt="corgi head smiling"
            src="\logo\corgi.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
        />{' '}
        Time Tracker
        </Navbar.Brand>
        <Nav.Item>
            <Nav.Link href="/Login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link href="/Signup" eventKey="link-1">Sign Up</Nav.Link>
        </Nav.Item>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Signed in as: <a href="#login">name</a>
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
    </>
    )
}

export default NavBar
