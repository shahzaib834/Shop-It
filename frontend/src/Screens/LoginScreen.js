import React, { useState, useEffect } from 'react';

import { login } from '../store/actions/userActions';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { Card, Form, Button } from 'react-bootstrap';

import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      // Go to home page
      navigate('/');
    }
  }, [dispatch, isAuthenticated]);

  const loginButtonHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
            marginTop: '8%',
          }}
        >
          <h3>Login</h3>
          <Form
            style={{
              marginTop: '7px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
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

            <Card.Text
              style={{
                display: 'flex',
                marginTop: '15px',
                cursor: 'pointer',
                justifyContent: 'flex-end',
              }}
            >
              Forgot Password?
            </Card.Text>

            <Button
              variant='warning'
              style={{ width: '100%', marginTop: '8px' }}
              onClick={loginButtonHandler}
            >
              LOGIN
            </Button>

            <Card.Text
              style={{
                display: 'flex',
                marginTop: '15px',
                justifyContent: 'flex-end',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/register')}
            >
              New User?
            </Card.Text>
          </Form>
        </Card>
      )}
    </>
  );
};

export default LoginScreen;
