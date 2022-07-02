import React, { useEffect } from 'react';

import { ListGroup, Col, Button, Row, Image } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../store/actions/productsActions';

import Ratings from '../components/Ratings';

import img from '../utils/camera.jpeg';

const ProductScreen = () => {
  const { loading, product } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch]);

  return (
    <div className='p-2'>
      <Row>
        <Col md={6}>
          <Image fluid src={img} width='600px' style={{ marginTop: '15rem' }} />
        </Col>

        <Col md={6} className='mt-5'>
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
                  <Button>-</Button>
                </Col>
                <Col md={1}>
                  <h6
                    style={{
                      paddingLeft: '7px',
                      paddingTop: '10px',
                    }}
                  >
                    1
                  </h6>
                </Col>
                <Col md={1}>
                  <Button>+</Button>
                </Col>
                <Col md={9}>
                  <Button>Add to Cart</Button>
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
              <Button>Submit Your Review</Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
