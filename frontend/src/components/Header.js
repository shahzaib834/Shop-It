import React from 'react';

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

            <div>
              <InputGroup style={{ width: '40rem' }}>
                <Form.Control type='search' placeholder='Enter Products ...' />
                <Button variant='warning' size='sm' id='button-addon2'>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
              </InputGroup>
            </div>

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
                    <div>
                      <Button variant='transparent' style={{ color: '#fff' }}>
                        Cart
                      </Button>

                      <div
                        style={{
                          display: 'inline',
                          color: 'orange',
                          borderRadius: '100px',
                        }}
                      >
                        2
                      </div>
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
