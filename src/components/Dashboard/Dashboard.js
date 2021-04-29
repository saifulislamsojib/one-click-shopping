import React, { useContext } from 'react';
import { Button, Container, Image } from 'react-bootstrap';
import { userContext } from '../../App';
import { userSignOut } from '../Login/authManager';

const Dashboard = () => {

    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const handleLogOut = () => {
        userSignOut()
        .then(() => {
            setLoggedInUser({});
            localStorage.removeItem('oneClick/idToken');
        });
    };

    const {name, email, photo} = loggedInUser;
    return (
        <Container className='mt-5 mb-3 text-center'>
            { name && <h3>Hi! {name}</h3>}
            <h4>Email: {email}</h4>
            <Image src={photo} className='mt-3' fluid />
            <Button onClick={handleLogOut} className='px-4 mt-3 d-block mx-auto' variant="danger">Logout</Button>
        </Container>
    );
};

export default Dashboard;