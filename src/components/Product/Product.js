import React from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Product.css';

const Product = ({product}) => {
    const {name, imageURL, weight, price, _id} = product;

    const history = useHistory();
    const handleBuyNow = (id) => history.push(`/checkout/${id}`);

    return (
        <Col md={6} lg={3} className='mb-4'>
            <div className='text-center product h-100 p-3'>
                <div className='product-image'>
                    <Image src={imageURL} fluid />
                </div>
                <h4 className='naming-space'>
                    <span className="mt-2 d-block">{name} - {weight}</span>
                </h4>
                <Row className='px-3 mt-3'>
                    <h4 className='text-success'>$ {price}</h4>
                    <Button onClick={() => handleBuyNow(_id)} className="ml-auto px-3" variant="primary">Buy Now</Button>
                </Row>
            </div>
        </Col>
    );
};

export default Product;