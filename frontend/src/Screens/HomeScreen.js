import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import Range from 'rc-slider';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { getProducts } from '../store/actions/productsActions';

import Loader from '../components/Loader';

const HomeScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);

  const { loading, products, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const params = useParams();

  const keyword = params.keyword;

  useEffect(() => {
    console.log(price);
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? <Loader /> : <h1 className='px-4 py-2 '>LATEST PRODUCTS</h1>}
      {keyword ? (
        <Row>
          <Col sm={8} md={4} lg={3} xl={2}>
            <Slider />
            <Range
              marks={{ 1: '$1', 1000: '$1000' }}
              min={1}
              max={1000}
              defaultValue={[1, 1000]}
              value={price}
              onChange={(price) => setPrice(price)}
              step={199}
            />
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
