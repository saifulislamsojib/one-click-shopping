import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const NotFound = () => {

    const history = useHistory();
    const handleGoHome = () => {
        history.push('/');
    }

    return (
        <div className="mt-5 text-danger text-center">
            <h1>Not Found</h1>
            <h2>404 error</h2>
            <Button onClick={handleGoHome} variant="warning">Go To Home</Button>
        </div>
    );
};

export default NotFound;