import { faCheckCircle, faEdit, faExternalLinkAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ProductInfo = ({index, product, handleDelete, handleEdit}) => {

    const [isEdit, setIsEdit] = useState(false);

    const [inputValue, setInputValue] = useState({...product});

    const handleInput = e => {
        const newInput = {...inputValue};
        newInput[e.target.name] = e.target.value;
        setInputValue(newInput);
    };

    const history = useHistory();
    const smallEdit = (id, index) => {
        history.push(`/admin/manageProducts/${id}?index=${index}`);
    }

    const {name, weight, price, _id} = product;

    return (
        <Row className='mb-4'>
            {!isEdit ? <>
            <h6 className='col-4'>{name}</h6>
            <h6 className='col-2 text-center'>{weight}</h6>
            <h6 className='col-2 text-center'>${price}</h6>
            </>:<>
            <h6 className='col-4'><input onChange={handleInput} name='name' className='form-control' type="text" defaultValue={name} /></h6>
            <h6 className='col-2 text-center'><input onChange={handleInput} name='weight' className='form-control' type="text" defaultValue={weight} /></h6>
            <h6 className='col-2 text-center'><input onChange={handleInput} name='price' className='form-control' type="text" defaultValue={price} /></h6></>}
            
            <h6 className='col-4 text-right'>
            { isEdit ?
            <FontAwesomeIcon onClick={() => handleEdit(inputValue, index, setIsEdit)} icon={faCheckCircle} className='mr-3 text-warning icons' />
            :<>
            <FontAwesomeIcon onClick={() => setIsEdit(true)} icon={faEdit} className='mr-3 text-warning icons d-none d-xl-inline' />
            <FontAwesomeIcon onClick={() => smallEdit(_id, index)} icon={faExternalLinkAlt} className='mr-3 text-info icons' /></>}
                <FontAwesomeIcon onClick={()=> handleDelete(product)} icon={faTrashAlt} className='text-danger icons' />
            </h6>
        </Row>
    );
};

export default ProductInfo;