import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from 'react-router';
import { userContext } from '../../App';
import { createUser, fbSignIn, googleSignIn, signingUser } from './authManager';
import './Login.css';

const Login = () => {

    const { register, handleSubmit, errors } = useForm();

    const [showPassword, setShowPassword] = useState({
        passwordType: 'password',
        passwordIcon: faEyeSlash
    });

    const [newUser, setNewUser] = useState(false);

    const [, setLoggedInUser] = useContext(userContext);

    const [loginError, setLoginError] =useState('');

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    const updateState = res => {
        if (res.email) {
            setLoggedInUser(res);
            history.replace(from);
            setLoginError('')
        }
        else{
            setLoginError(res);
        }
    }

    const onSubmit = data => {
        const {email, password, name, confirmPassword} = data;
        if (newUser) {
            if (password === confirmPassword) {
                createUser(email, password, name)
                .then(res => {
                    updateState(res);
                })
            }
            else{
                setLoginError('Password Not Matched');
            }
        }
        else{
            signingUser(email, password)
            .then(res => {
                updateState(res);
            })
        }
    };

    const SignInWithProvider = (provider) => {
        provider()
        .then(res => {
            updateState(res);
        })
    }

    const handlePasswordType = () => {
        const {passwordType, passwordIcon} = showPassword;
        const changedPasswordType = passwordType === 'password' ? 'text' : 'password';
        const changeIcon = passwordIcon === faEye ? faEyeSlash : faEye;
        const changedShowPassword = {
            passwordType: changedPasswordType,
            passwordIcon: changeIcon
        }
        setShowPassword(changedShowPassword);
    };

    const {passwordType, passwordIcon} = showPassword;
    return (
        <Container>
            <div className="login">
            <div className="my-4 login-inner product">
                <form className="email-password-login" onSubmit={handleSubmit(onSubmit)}>
                    <h2 className='mb-5'>{newUser ? "Create an account" : 'Login'}</h2>
                    { newUser && <input className='p-4 form-control my-3 input' type='text' name="name" ref={register({ required: true })} placeholder="Enter your Name" />}
                    {errors.name && <span className="text-danger">Name is required</span>}

                    <input className='p-4 form-control my-3 input' type='email' name="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Enter your Email" />
                    {errors.email && <span className="text-danger">Enter A Valid Email</span>}

                    <div className='password-section'>
                        <input className='p-4 input my-3 form-control' type={passwordType} name="password" ref={register({ required: true, minLength: 6 })} placeholder="Enter Password" />
                        <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                    </div>
                    {errors.password && <span className="text-danger">Password required Minimum 6 Character</span>}

                    { newUser && <div className='password-section'>
                        <input className='p-4 input my-3 form-control' type={passwordType} name="confirmPassword" ref={register({ required: true })} placeholder="Confirm Password" />
                        <FontAwesomeIcon onClick={handlePasswordType} className='eye' icon={passwordIcon} />
                    </div>}
                    {errors.confirmPassword && <span className="text-danger">Confirm Password is required</span>}

                    <div className='d-flex justify-content-between mt-2'>
                        <div>
                            <input type="checkbox" className="mr-2" name="" id="remember"/>
                            <label htmlFor="remember">Remember Me</label>
                        </div>
                        { !newUser && <a href="#forgot">Forgot Password</a>}
                    </div>
                    <input className='input w-100 btn btn-success my-3 p-2' type="submit" value={newUser ? 'Create Account' : 'Login'} />
                    <p className='text-danger text-center py-2 error'>{loginError}</p>
                    <h6 className='text-center'>{newUser ? 'Already' :"Don't"} have an account ? <span onClick={()=> setNewUser(!newUser)} className="text-primary ml-2 create-account">{newUser ? 'Login' : 'Create an account'}</span></h6>
                </form>
                <h5 className='text-center my-4'>Or</h5>
                <div className="text-center">
                    <FontAwesomeIcon onClick={() =>SignInWithProvider(fbSignIn)} className='icon fb mx-2' icon={faFacebook} />
                    <FontAwesomeIcon onClick={() =>SignInWithProvider(googleSignIn)} className='icon google mx-2' icon={faGoogle} />
                </div>
            </div>
            </div>
        </Container>
    );
};

export default Login;