import React from 'react';
import { Row } from 'react-bootstrap';

const Order = ({order}) => {
    const {product,orderDate} = order;
    const {name, price, weight} = product;
    return (
        <Row className='mb-4 border-bottom pb-2'>
            <h6 className='col-5'>{name}</h6>
            <h6 className='col-2 text-center'>{weight}</h6>
            <h6 className='col-2 text-center'>${price}</h6>
            <h6 className='col-3 text-right'>{orderDate}</h6>
        </Row>
    );
};

export default Order;