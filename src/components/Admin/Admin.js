import { faPlus, faSort, faThLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import AddProduct from '../AddProduct/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
import ManageSingleProduct from '../ManageSingleProduct/ManageSingleProduct';
import Orders from '../Orders/Orders';
import './Admin.css';

const Admin = ({products, setProducts}) => {

    const { path, url } = useRouteMatch();

    const history = useHistory();

    const [active, setActive] = useState({
        manage: 'side-nav-active'
    });

    const handleActive = activator =>{
        const newActive = {};
        newActive[activator]= 'side-nav-active';
        setActive(newActive);
    }

    const handleEdit = (product, index, setIsEdit) => {
        const {name, weight, price, _id} = product;
        if (name && price && weight) {
            fetch(`https://apricot-crisp-29597.herokuapp.com/updateProduct/${_id}`, {
                method: 'PATCH',
                body: JSON.stringify({name, weight, price}),
                headers: {'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(result => {
                if(result){
                    const newProducts = [...products];
                    newProducts[index] = product;
                    setProducts(newProducts);
                    setIsEdit ? setIsEdit(false):
                        history.push(`${url}/manageProduct`);
                };
            });
        };
    }

    return (
        <Container>
            <div className='d-lg-flex align-items-start mt-5'>
                <Navbar className='position-relative' expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className='navbar-section' id="basic-navbar-nav">
                        <Nav className="side-navbar flex-column">
                            <Link onClick={() => handleActive('manage')} to="/admin">
                                <Navbar.Brand className="mb-3 text-white">One Click Shopping</Navbar.Brand>
                            </Link>
                            <Link onClick={() => handleActive('manage')} className={`p-2 nav-link text-white ${active.manage}`} to={`${url}/manageProduct`} > <FontAwesomeIcon icon={faThLarge} /> Manage Products</Link>
                            <Link onClick={() => handleActive('add')} className={`p-2 nav-link text-white ${active.add}`} to={`${url}/addProduct`} > <FontAwesomeIcon icon={faPlus} /> Add Product</Link>
                            <Link onClick={() => handleActive('orders')} className={`p-2 nav-link text-white ${active.orders}`} to={`${url}/allOrders`} > <FontAwesomeIcon icon={faSort} /> All Orders</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch className='admin-switch'>
                    <Route exact path={path}>
                        <ManageProduct handleEdit={handleEdit} products={products} setProducts={setProducts} />
                    </Route>
                    <Route path={`${path}/manageProduct`}>
                        <ManageProduct handleEdit={handleEdit} products={products} setProducts={setProducts} />
                    </Route>
                    <Route path={`${path}/manageProducts/:id`}>
                        <ManageSingleProduct handleEdit={handleEdit} products={products} />
                    </Route>
                    <Route path={`${path}/addProduct`}>
                        <AddProduct products={products} setProducts={setProducts} />
                    </Route>
                    <Route path={`${path}/allOrders`}>
                        <Orders allOrders={true} />
                    </Route>
                </Switch>
            </div>
        </Container>
    );
};

export default Admin;