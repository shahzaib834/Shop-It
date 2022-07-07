import './App.css';
import { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import CartScreen from './Screens/CartScreen';

import { Container } from 'react-bootstrap';

import { loadUser } from './store/authReducer';
import store from './store/store';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path={`/search/:keyword`} element={<HomeScreen />} />
          <Route path={'/products/:id'} element={<ProductScreen />} />
          <Route path={'/login'} element={<LoginScreen />} />
          <Route path={'/register'} element={<RegisterScreen />} />
          <Route path={'/cart'} element={<CartScreen />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
