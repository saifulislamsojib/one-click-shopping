import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css';

const Header = ({privateRender}) => {

    const [loggedInUser] = useContext(userContext);

    const history = useHistory();

    const handleLogin = () => {
        history.push('/login');
    };

    const goToDashboard = () => {
        history.push('/dashboard');
    }

    const {email, name, photo} = loggedInUser;

    return (
        <div>
            <Container>
            <Navbar expand="lg">
                <Link to="/"><Navbar.Brand className='navbar-brand'>One Click Shopping</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link className='ml-lg-3 nav-link active' to="/">Home</Link>
                        <Link className='ml-lg-3 nav-link' to="/orders">Orders History</Link>
                        <Link className='ml-lg-3 nav-link' to="/admin">Admin</Link>
                        {email ?
                        photo ? <img src={photo} onClick={goToDashboard} className='user-logo ml-2 ml-lg-3  mt-3 mt-lg-0' alt=""/> :
                        <h6 onClick={goToDashboard} className='py-2 ml-lg-3 user-name'>{name || email}</h6> :
                        privateRender ?
                            <Button onClick={handleLogin} className='px-4 ml-lg-3' variant="success">Login</Button>:
                            <h6 className='py-2 ml-lg-3'>Loading...</h6>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
        </div>
    );
};

export default Header;