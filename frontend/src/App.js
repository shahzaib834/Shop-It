import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
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
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
