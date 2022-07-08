import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { Button, Card, InputGroup, Form } from 'react-bootstrap';

const ShippingScreen = () => {
  const { user } = useSelector((state) => state.auth);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phoneNo, setPhoneNo] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState('');

  if (user !== null) {
    return <Navigate to='/login' replace />;
  }

  return (
    <Card>
      <Card.Title>Shipping Info</Card.Title>
      <Form>
        <label>Address</label>
        <Form.Control
          className='mt-2'
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>City</label>
        <Form.Control
          className='mt-2'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>Phone No</label>
        <Form.Control
          className='mt-2'
          value={phoneNo}
          onChange={(e) => setPhoneNo(e.target.value)}
        />

        <label>Postal Code</label>
        <Form.Control
          className='mt-2'
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <label>Country</label>
        <Form.Control
          className='mt-2'
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <Button varinat='warning'>Continue</Button>
      </Form>
    </Card>
  );
};

export default ShippingScreen;
