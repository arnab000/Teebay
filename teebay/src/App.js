import logo from './logo.svg';
// import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Registration from './pages/auth/Registration.jsx';
import Login from './pages/auth/Login.jsx';
import ProductList from './pages/ProductList.jsx';
import AddProduct from './pages/AddProduct';
import EditProducts from './pages/EditProduct';
import AllProduct from './pages/AllProduct';
import BuyOrRent from './pages/BuyOrRent';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Registration/>}/>
          <Route path='/log-in' element={<Login/>}/>
          <Route path='/my-products' element={<ProductList/>}/>
          <Route path='/add-products' element={<AddProduct/>}/>
          <Route path='/edit-products/:id' element={<EditProducts/>}/>
          <Route path='/all-products' element={<AllProduct/>}/>
          <Route path='/each-product/:id' element={<BuyOrRent/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
