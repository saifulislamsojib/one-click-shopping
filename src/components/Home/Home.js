import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import Product from '../Product/Product';
import SpinnerDiv from '../SpinnerDiv/SpinnerDiv';
import './Home.css';

const Home = ({products, getSearchInput, finishSearch}) => {

    return (
        <Container className='mt-5'>
            <InputGroup className="mb-3 search-bar">
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"> <FontAwesomeIcon icon={faSearch} /> </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Search A Product"
                aria-label="Username"
                aria-describedby="basic-addon1"
                className='search-input'
                onBlur={getSearchInput}
                onKeyPress={e => e.key === 'Enter' && getSearchInput(e)}
                />
                <InputGroup.Append>
                    <Button variant="primary">Search</Button>
                </InputGroup.Append>
            </InputGroup>

            {products.length > 0 ?
                <Row className='mt-5'>
                {
                   products.map(product => <Product product={product} key={product._id} />) 
                }
            </Row>: finishSearch ?
                <h4 className='mt-5 text-center text-muted'>No Search Matched...</h4>
             :<SpinnerDiv />}

        </Container>
    );
};

export default Home;