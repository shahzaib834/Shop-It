import React from 'react';

import {
  Nav,
  Navbar,
  Container,
  Form,
  FormControl,
  Button,
  InputGroup,
} from 'react-bootstrap';

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
            }}
          >
            <Navbar.Brand>Shop-it</Navbar.Brand>

            <div>
              <InputGroup>
                <Form.Control type='search' placeholder='Enter Products ...' />
                <Button variant='warning' size='sm' id='button-addon2'>
                  Button
                </Button>
              </InputGroup>
            </div>

            <div>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
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
