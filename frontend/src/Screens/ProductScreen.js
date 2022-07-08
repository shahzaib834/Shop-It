import React, { useEffect, useState } from 'react';
import { ListGroup, Col, Button, Row, Image, Toast } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../store/productReducer';

import Ratings from '../components/Ratings';

import img from '../utils/camera.jpeg';

import { addToCart } from '../store/cartReducer';

const ProductScreen = () => {
  const [showCartToast, setShowCartToast] = useState(false);
  const [loginToast, setLoginToast] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const { product } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchProduct(params.id));
    //dispatch(getProductDetails(params.id));
  }, [dispatch]);

  const incrementQuantity = () => {
    if (product.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity >= 2) {
      setQuantity(quantity - 1);
    }
  };

  const toCart = () => {
    if (isAuthenticated) {
      const alreadyHaveItem = cartItems.some((c) => {
        return c.id === product._id;
      });

      if (!alreadyHaveItem) {
        const item = {
          id: product._id,
          name: product.name,
          price: product.price,
          stock: product.stock,
          quantity,
        };
        dispatch(addToCart(item));
      } else {
        setShowCartToast(true);
      }
    } else {
      setLoginToast(true);
    }
  };

  return (
    <div className='p-2'>
      <Row>
        <Col md={6}>
          <Image fluid src={img} width='600px' style={{ marginTop: '15rem' }} />
        </Col>

        <Col md={6} className='mt-5'>
          <Toast show={showCartToast} style={{ backgroundColor: '#ed3511' }}>
            <Toast.Body>Item already added in cart.</Toast.Body>
          </Toast>
          <Toast show={loginToast} style={{ backgroundColor: '#ed3511' }}>
            <Toast.Body>Please login to add item to cart.</Toast.Body>
          </Toast>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
              <p>product # {product._id}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <Ratings
                numReviews={product.numOfReviews}
                ratings={product.ratings}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>$ {product.price}</h2>
              <Row>
                <Col md={1}>
                  <Button onClick={decrementQuantity} variant='warning'>
                    -
                  </Button>
                </Col>
                <Col md={1}>
                  <h6
                    style={{
                      paddingLeft: '7px',
                      paddingTop: '10px',
                    }}
                  >
                    {quantity}
                  </h6>
                </Col>
                <Col md={1}>
                  <Button onClick={incrementQuantity} variant='warning'>
                    +
                  </Button>
                </Col>
                <Col md={9}>
                  <Button variant='warning' onClick={toCart}>
                    Add to Cart
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              Status: {product.stock > 0 ? <> In Stock</> : <> Out of stock</>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Description :</h6>
              <p>{product.description}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <span>
                Sold By : <strong>{product.seller}</strong>
              </span>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button variant='warning'>Submit Your Review</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
