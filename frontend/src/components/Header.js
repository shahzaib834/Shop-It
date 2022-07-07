import React, { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import {
  Navbar,
  Container,
  Form,
  Button,
  InputGroup,
  Image,
  Dropdown,
  Badge,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import logo from '../utils/shopit_logo.png';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../store/actions/userActions';

import avatar from '../utils/avatar-1.png';

import { CartState } from '../context/Context';

const Header = () => {
  const {
    state: { cart },
  } = CartState();
  const [keyword, setKeyword] = useState('');

  const { loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  const logout = () => {
    dispatch(logOut());
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
            <Link to={'/'}>
              <Image src={logo} />
            </Link>
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
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <Button
                      variant='transparent'
                      style={{ color: '#fff', display: 'flex' }}
                      onClick={() => navigate('/cart')}
                    >
                      Cart
                      <Badge style={{ left: '5px' }}>{cart.length}</Badge>
                    </Button>
                  </div>

                  {user ? (
                    <Dropdown alignRight>
                      <Dropdown.Toggle variant='success'>
                        <Image
                          src={avatar}
                          fluid
                          style={{
                            width: '100%',
                            height: '90%',
                            borderRadius: '100px',
                          }}
                        />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <span style={{ padding: '10px' }} onClick={logout}>
                          Log out
                        </span>
                      </Dropdown.Menu>
                    </Dropdown>
                  ) : (
                    !loading && (
                      <Button
                        variant='warning'
                        onClick={() => navigate('/login')}
                        style={{ marginLeft: '20px' }}
                      >
                        Login
                      </Button>
                    )
                  )}
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
