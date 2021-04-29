import React from 'react';
import { Row } from 'react-bootstrap';
import ProductInfo from '../ProductInfo/ProductInfo';
import SpinnerDiv from '../SpinnerDiv/SpinnerDiv';
import './ManageProduct.css';

const ManageProduct = ({products, setProducts, handleEdit}) => {

    const handleDelete = product => {
        fetch('https://apricot-crisp-29597.herokuapp.com/deleteProduct', {
            method: 'DELETE',
            body: JSON.stringify(product),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(result => {
            if(result){
                const newProducts = products.filter(pd => pd._id !==product._id);
                setProducts(newProducts);
            }
        });
    };

    return (
        <div>
            <h1 className='text-center mb-4'>Manage Product</h1>
            <h3 className='text-center mb-4'>Total Products: {products.length}</h3>
            { products.length > 0 ?
            <div className='add-product-form bg-white'>
                <Row className='mb-3 pb-2 border-bottom'>
                        <h6 className='col-4'>name</h6>
                        <h6 className='col-2 text-center'>weight</h6>
                        <h6 className='col-2 text-center'>price</h6>
                        <h6 className='col-4 text-right'>Action</h6>
                </Row>
                {
                    products.map((product, index) => <ProductInfo index={index} key={product._id} product={product} handleEdit={handleEdit} handleDelete={handleDelete} />)
                }
            </div>:<SpinnerDiv />}
        </div>
    );
};

export default ManageProduct;