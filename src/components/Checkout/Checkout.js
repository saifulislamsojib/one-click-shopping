import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import SpinnerDiv from '../SpinnerDiv/SpinnerDiv';
import './Checkout.css';

const Checkout = () => {

    const {id} = useParams();

    const [loggedInUser] = useContext(userContext);

    const [product, setProduct] = useState({});

    const [isOrdered, setIsOrdered] = useState(false);

    const [orderedProduct, setOrderedProduct] = useState(null);

    const history = useHistory();

    useEffect(() => {
        fetch(`https://apricot-crisp-29597.herokuapp.com/product/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [id]);

    const handleCheckout = product => {
        const orderDetails = {...loggedInUser, product};
        setIsOrdered(false);
        setOrderedProduct(orderDetails);
    }

    const handlePaymentCheckout = paymentDetails => {
        fetch('https://apricot-crisp-29597.herokuapp.com/checkoutOrder', {
            method: 'POST',
            body: JSON.stringify({...orderedProduct, paymentDetails, orderDate: new Date().toDateString(), orderTime: new Date().toTimeString()}),
            headers: {"Content-Type": "application/json"}
        })
        .then(res => res.json())
        .then(result => {
            if (result) {
                setIsOrdered(true);
            }
        });
    };

    const {name, weight, price} = product;
    return (
        <Container className='mt-5'>
            <h1>Checkout</h1>
            { product.name ? <>
            {!orderedProduct ? <div>
                <div className='product-list'>
                    <div className='d-flex justify-content-between'>
                        <h5 className='w-50 text-muted'>name</h5>
                        <h5 className='text-muted'>weight</h5>
                        <h5 className='text-muted'>price</h5>
                    </div>
                    <div className='d-flex justify-content-between product-list-details'>
                        <h5 className='w-50'>{name}</h5>
                        <h5>{weight}</h5>
                        <h5>${price}</h5>
                    </div>
                    <div className='d-flex justify-content-between'>
                        <h5>total</h5>
                        <h5>${price}</h5>
                    </div>
                </div>
                <Button onClick={ () => handleCheckout(product)} className='d-block ml-auto mb-3 mt-4 mr-2' variant="success" >Checkout</Button>
            </div>:
            <div>
                <h4 className='my-4'>Process your Payment</h4>
                <ProcessPayment handlePaymentCheckout={handlePaymentCheckout} />
            </div>}
            {isOrdered && <h5 className='mt-3 text-success text-center'>Ordered Successful</h5>}
            {isOrdered && <Button onClick={()=>history.push('/')} variant="warning" className='my-3 d-block mx-auto'>Go To Home</Button>}
            </>: <SpinnerDiv />}
        </Container>
    );
};

export default Checkout;