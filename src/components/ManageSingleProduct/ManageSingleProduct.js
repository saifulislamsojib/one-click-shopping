import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import SpinnerDiv from '../SpinnerDiv/SpinnerDiv';

const ManageSingleProduct = ({products, handleEdit}) => {

    const {id} = useParams();

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    const index = query.get("index");

    const [product, setProduct] = useState({});

    const [inputValue, setInputValue] = useState({});

    useEffect(() => {
        const matchedProduct = products.find(pd =>pd._id === id);
        if(products.length){
            if (matchedProduct) {
                setProduct(matchedProduct);
                setInputValue(matchedProduct);
            }
            else{
                setProduct({notFound: true});
            }
        }
    }, [id, products]);

    const [disabled, setDisabled] = useState(true);
    
    const handleInput = e => {
        const newInput = {...inputValue};
        newInput[e.target.name] = e.target.value;
        setInputValue(newInput);
        if (newInput.name === product.name && newInput.price===product.price && newInput.weight===product.weight) {
            setDisabled(true);
        }
        else{
            setDisabled(false);
        }
    };

    const {name, price, weight} = product;

    return (
        <>
            {product.name ? <>
            <h1 className='mt-3 text-center'>Edit Product</h1>
            <Row className='mt-2'>
                <Col md={6}>
                    <label className='my-2' htmlFor="">Name</label>
                    <input onChange={handleInput} name='name' className='form-control' type="text" defaultValue={name} />
                </Col>
                <Col md={6}>
                    <label className='my-2' htmlFor="">Weight</label>
                    <input onChange={handleInput} name='weight' className='form-control' type="text" defaultValue={weight} />
                </Col>
                <Col md={6}>
                    <label className='my-2' htmlFor="">price</label>
                    <input onChange={handleInput} name='price' className='form-control' type="text" defaultValue={price} />
                </Col>
            </Row>
            <Button disabled={disabled} onClick={() => handleEdit(inputValue, index)} className='mt-4 ml-auto d-block'><FontAwesomeIcon icon={faCheckCircle} className='text-warning' /> Done</Button>
            </>: product.notFound ?<NotFound /> : <SpinnerDiv />}
        </>
    );
};

export default ManageSingleProduct;