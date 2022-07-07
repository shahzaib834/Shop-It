import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Ratings from './Ratings';
import img from '../utils/camera.jpeg';

const Product = ({ product }) => {
  return (
    <Card className='p-2 mx-2'>
      <Card.Img src={img} />

      <Card.Text style={{ minHeight: '48px' }}>{product.name}</Card.Text>

      <Ratings numReviews={product.numOfReviews} ratings={product.ratings} />
      <Card.Text>$ {product.price}</Card.Text>

      <Link to={`products/${product._id}`}>
        <Button
          size='lg'
          style={{
            backgroundColor: '#ffbb33',
            border: 'none',
            width: '100%',
          }}
        >
          View Details
        </Button>
      </Link>
    </Card>
  );
};

export default Product;
