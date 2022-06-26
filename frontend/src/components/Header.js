import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Navbar,
  Container,
  Form,
  Button,
  InputGroup,
  Image,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import logo from '../utils/shopit_logo.png';

const Header = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
        style={{ height: '4.5rem' }}
      >
        <Container>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Image src={logo} />

            <Form>
              <InputGroup style={{ width: '40rem' }}>
                <Form.Control
                  type='search'
                  placeholder='Enter Products ...'
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <Button
                  variant='warning'
                  size='sm'
                  id='button-addon2'
                  onClick={searchHandler}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </InputGroup>
            </Form>

            <div>
              <Navbar.Collapse id='basic-navbar-nav'>
                <div
                  style={{
                    display: 'flex',
                    width: '8.5rem',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button variant='warning'>Login</Button>
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <Button variant='transparent' style={{ color: '#fff' }}>
                      Cart
                    </Button>

                    <div
                      style={{
                        color: 'orange',
                        borderRadius: '100px',
                      }}
                    >
                      2
                    </div>
                  </div>
                </div>
              </Navbar.Collapse>
            </div>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
