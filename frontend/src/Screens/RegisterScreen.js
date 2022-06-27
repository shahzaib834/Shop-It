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
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(
    '/images/default_avatar/jpg'
  );

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in navigate to Home page
  }, [dispatch]);

  const registerButtonHandler = (e) => {
    e.preventDefault();

    dispatch(register(name, email, password, avatar));

    if (isAuthenticated) {
      navigate('/');
    }
  };

  const onChange = (e) => {
    setAvatar(e.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Card
          style={{
            width: '40%',
            height: '30rem',
            padding: '40px',
            backgroundColor: '#fff',
            margin: 'auto',
            marginTop: '8%',
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

            <Form.Group controlId='avatar'>
              <Form.Label>Avatar</Form.Label>
              <Form.Control type='file' onChange={onChange} accept='images/*' />
            </Form.Group>

            <Button
              variant='warning'
              style={{ width: '100%', marginTop: '8px' }}
              onClick={registerButtonHandler}
              disabled={loading ? true : false}
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
