import React, { useState, useEffect } from 'react';

import { register } from '../store/actions/userActions';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Card, Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const { loading, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in navigate to Home page
  }, [dispatch]);

  const registerButtonHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));

    if (error) {
      console.log(error);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card
          style={{
            width: '40%',
            height: '25rem',
            padding: '40px',
            backgroundColor: '#fff',
            margin: 'auto',
            marginTop: '12%',
          }}
        >
          <h3>Register</h3>
          <Form
            style={{
              marginTop: '7px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label>Name</label>
            <Form.Control
              placehoder='Your name'
              className='mt-2'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <Form.Control
              placehoder='email@email.com'
              className='mt-2'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label style={{ marginTop: '12px' }}>Password</label>
            <Form.Control
              placehoder='Password'
              className='mt-2'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant='warning'
              style={{ width: '100%', marginTop: '8px' }}
              onClick={registerButtonHandler}
            >
              Register
            </Button>
          </Form>
        </Card>
      )}
    </>
  );
};

export default RegisterScreen;
