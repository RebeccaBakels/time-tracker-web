import React, {useContext} from 'react' 
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'
import { UserContext } from '../App'
import firebase from 'firebase'

function NavBar() {
    const { user, setUser, } = useContext(UserContext)
    function SignOut() {
        firebase.auth().signOut()
        .then(() => {
            setUser(null)
        })
        .catch((error) => console.log(error))
    }

    return(
    <>
    <Navbar bg="light" variant="light">
        <Navbar.Brand >
        <img
            alt="corgi head smiling"
            src="\logo\corgi.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
        />{' '}
        <Link to="/">Time Tracker</Link>
        </Navbar.Brand>
        {
        !user ?
        <>
        <Nav.Item>
            <Nav.Link><Link to="/LogIn">Login</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link eventKey="link-1"><Link to="/SignUp">Sign Up</Link></Nav.Link>
        </Nav.Item>
        </>
        :
        <>
        <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={() => SignOut()}><Link to="/">Logout</Link></Nav.Link>
        </Nav.Item>
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
            Signed in as: <a href="#login">`{user}</a>
            </Navbar.Text>
        </Navbar.Collapse>
        </>
        }  
    </Navbar>
    </>
    )
}

export default NavBar
