import React, { useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../store/actions/productsActions';

import Loader from '../components/Loader';

const HomeScreen = () => {
  const { loading, products, productsCount } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);

  return (
    <>
      {loading ? <Loader /> : <h1 className='px-4 py-2 '>LATEST PRODUCTS</h1>}
      <Row>
        {products &&
          products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product key={products._id} product={product} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default HomeScreen;
