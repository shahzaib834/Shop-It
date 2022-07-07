import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { Row, Col, InputGroup, Form, Card } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { fetchProducts } from '../store/productsReducer';

import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);

  const { status, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const categories = [
    'Electronics',
    'Camera',
    'Laptop',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home',
  ];

  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;

  useEffect(() => {
    dispatch(
      fetchProducts(keyword, currentPage, minPrice, maxPrice, category, ratings)
    );
  }, [dispatch, keyword, currentPage, minPrice, maxPrice, category, ratings]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <h1 className='px-4 py-2 '>LATEST PRODUCTS</h1>
      )}
      {keyword ? (
        <Row>
          <Col sm={8} md={4} lg={3} xl={2}>
            <Card style={{ border: 'none' }}>
              <Card.Title
                style={{
                  padding: '5px',
                  marginLeft: '4px',
                }}
              >
                Price
              </Card.Title>
              <InputGroup
                className='d-flex p-2'
                style={{
                  flexDirection: 'column',
                }}
              >
                <Form.Control
                  style={{ width: '100%' }}
                  type='price[lte]'
                  placeholder='0 $'
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Form.Control
                  style={{ width: '100%', marginTop: '5px' }}
                  type='price[gte]'
                  placeholder='1000 $'
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </InputGroup>
              <hr />

              <Card.Title
                style={{
                  padding: '5px',
                  marginLeft: '4px',
                }}
              >
                Categories
              </Card.Title>

              <div
                style={{
                  padding: '5px',
                  marginLeft: '4px',
                  cursor: 'pointer',
                }}
              >
                <Row className='mx-1' onClick={() => setCategory('Camera')}>
                  Camera
                </Row>
                <Row
                  className='mx-1'
                  onClick={() => setCategory('Accessories')}
                >
                  Accessorries
                </Row>
                <Row className='mx-1' onClick={() => setCategory('Laptop')}>
                  Laptop
                </Row>
                <Row className='mx-1' onClick={() => setCategory('Food')}>
                  Food
                </Row>
                <Row
                  className='mx-1'
                  onClick={() => setCategory('Electronics')}
                >
                  Electronics
                </Row>
              </div>

              <hr />

              <div style={{ cursor: 'pointer' }} onClick={() => setRatings(1)}>
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setRatings(2)}>
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setRatings(3)}>
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setRatings(4)}>
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => setRatings(5)}>
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
                <FontAwesomeIcon
                  color='#f8e825'
                  icon={faStar}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </Card>
          </Col>
          {products &&
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product key={products._id} product={product} />
              </Col>
            ))}
        </Row>
      ) : (
        <Row>
          {products &&
            products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Product key={products._id} product={product} />
              </Col>
            ))}
        </Row>
      )}

      <div className='d-flex justify-content-center mt-5'>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText={'Next'}
          prevPageText={'Prev'}
          firstPageText={'First'}
          lastPageText={'Last'}
          itemClass='page-item'
          linkClass='page-link'
        />
      </div>
    </>
  );
};

export default HomeScreen;
