import React from 'react';

import { useSelector } from 'react-redux';

import { Card, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import img from '../utils/camera.jpeg';

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div style={{ marginTop: '40px' }}>
      {cartItems.length <= 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <h2>
            Your Cart: <strong>{cartItems.length} Items</strong>
          </h2>
          <Row className='p-5 m-2'>
            <Col sm={8} md={8} lg={8} xl={8}>
              <Row>
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '2px',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    border: 'none',
                  }}
                >
                  <Card.Img
                    src={img}
                    fluid
                    style={{ height: '70%', width: '30%' }}
                  />
                  <Card.Text>Cable Boom Microphone</Card.Text>
                  <Card.Text style={{ fontSize: '25px', color: 'orange' }}>
                    $27.61
                  </Card.Text>
                  <Button style={{ backgroundColor: 'red', border: 'none' }}>
                    -
                  </Button>
                  <Card.Text>1</Card.Text>
                  <Button>+</Button>
                  <FontAwesomeIcon icon={faTrashCan} color='red' />
                </Card>
              </Row>
            </Col>
            <Col sm={4} md={4} lg={4} xl={4}>
              <Row>
                <Card
                  style={{
                    padding: '30px',
                    marginLeft: '10px',
                    marginTop: '20px',
                    borderRadius: '15px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                      <strong>3 Units</strong>
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
                    style={{ borderRadius: '15px', width: '90%' }}
                  >
                    Check Out
                  </Button>
                </Card>
              </Row>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CartScreen;
