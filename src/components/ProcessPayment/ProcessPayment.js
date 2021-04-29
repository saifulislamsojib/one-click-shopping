import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutPaymentForm from './CheckoutPaymentForm';
import './ProcessPayment.css';

const stripePromise = loadStripe('pk_test_51Ie1V6Aetm14Pqi2OuAecsC6zMQYlaOPkB42dN1dsMtOy5dVogqIdkEa6FNrKEI0AjyBbm2OnVgqZcs7w0CovbPE00gIznQaTQ');

const ProcessPayment = ({handlePaymentCheckout}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPaymentForm handlePaymentCheckout={handlePaymentCheckout} />
        </Elements>
    );
};

export default ProcessPayment;