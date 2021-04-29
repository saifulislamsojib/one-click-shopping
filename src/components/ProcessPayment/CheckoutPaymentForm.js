import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const CheckoutPaymentForm = ({handlePaymentCheckout}) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState('');

    const [paymentSuccess, setPaymentSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
        return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess('');
        } else {
            const {brand, exp_month, exp_year, last4} = paymentMethod.card;
            const paymentDetails = {paymentId: paymentMethod.id, brand, exp_month, exp_year, last4};
            handlePaymentCheckout(paymentDetails);
            setPaymentSuccess(paymentMethod.id);
            setPaymentError('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                      base: {
                        fontSize: '16.5px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                }}
            />
            <Button className="mt-3" variant="success" type="submit" disabled={!stripe}>
                Pay
            </Button>
            {
                paymentError && <p className="text-danger text-center mt-3">{paymentError}</p>
            }
            {
                paymentSuccess && <p className="text-success text-center mt-3">Your payment has been successfully completed</p>
            }
        </form>
    );
};

export default CheckoutPaymentForm;