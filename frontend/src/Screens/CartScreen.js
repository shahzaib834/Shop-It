import React from 'react';

import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import img from '../utils/camera.jpeg';
import { CartState } from '../context/Context';
import { useEffect } from 'react';

const CartScreen = () => {
  const {
    state: { cart },
  } = CartState();

  /* const onDeleteButtonClick = (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id,
    });
  }; */

  return (
    <div style={{ marginTop: '40px' }}>
      {cart.length <= 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <h2>
            Your Cart: <strong>{cart.length} Items</strong>
          </h2>
          <div className='d-flex'>
            <div
              style={{
                display: 'flex',
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {cart.map((c) => (
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: 'none',
                  }}
                >
                  <Card.Img
                    src={img}
                    fluid
                    style={{ height: '70%', width: '30%' }}
                  />
                  <Card.Text style={{ width: '30%' }}>{c.name}</Card.Text>
                  <Card.Text style={{ fontSize: '25px', color: 'orange' }}>
                    $ {c.price}
                  </Card.Text>
                  <Button style={{ backgroundColor: 'red', border: 'none' }}>
                    -
                  </Button>
                  <Card.Text>{c.quantity}</Card.Text>
                  <Button>+</Button>
                  <FontAwesomeIcon icon={faTrashCan} color='red' />
                </Card>
              ))}
            </div>

            <Card
              style={{
                display: 'flex',
                flex: 1,
                marginLeft: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'gray',
                padding: '5px',
                height: '220px',
              }}
            >
              <Card.Title>Order Summary</Card.Title>
              <br />
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Card.Text>Sub Total:</Card.Text>
                <Card.Text>
                  <strong>{cart.length} (Units)</strong>
                </Card.Text>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <Card.Text>Est. Total:</Card.Text>
                <Card.Text>
                  <strong>$7564.5</strong>
                </Card.Text>
              </div>
              <br />

              <Button
                variant='warning'
                style={{
                  borderRadius: '15px',
                  width: '90%',
                }}
              >
                Check Out
              </Button>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;