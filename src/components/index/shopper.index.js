import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { ShopperHome } from '../home/home';
import { ShopperCategory } from '../categories/categories1';
import { ProductDetails } from '../productdetails/productdetail';
import { Invalid } from '../invalid/invalid';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { useCookies } from 'react-cookie';
import { Addtocart } from '../add to cart/addtocart';

export function ShopperIndex() {
  const [cookie, setCookie, removeCookie] = useCookies();

  function handleSignOut(){
      const confirm = window.confirm('Are you sure to logout?');
      if (confirm) {
        removeCookie("username");
        removeCookie("name");
        removeCookie("password");
      }
  }

  
  return (
    <div className='container-fluid'>
      <BrowserRouter>
        <div className='d-flex border p-1 ' >
          <div className='d-flex border-dark' style={{ marginLeft: "100px", marginTop: "0", marginBottom: "0", paddingTop: '0' }}>
            <img src="logo.png" height="80px" />
            <div className="active-purple-4 m-4 d-flex " style={{ width: "550px" }}>
              <input className="form-control w-100" type="text" placeholder="Search for products,brands and more.." />
              <i class="bi bi-search   ms-2 mt-2" style={{ fontSize: "30px", color: "blue" }}></i>
            </div>
          </div>
          <div className='d-flex justify-content-between'>
            <div style={{ marginLeft: "20px", marginTop: "20px", width: "200px" }} className="text-center" >
              <Link to="login" ><span className="bi bi-person-fill " style={{ fontSize: "35px", color: "blue" }}></span></Link>
              <br />
              <span className='text-center text-primary'>{cookie.name}</span>
            </div>
            <nav style={{ marginLeft: "50px" }} >
              <div className='d-flex'>
                <Link to="/"><div><span className='btn  mt-4  me-3 text-primary' style={{ fontSize: "15px" }}><b>Home</b></span></div></Link>
                <div><span className='btn  mt-4  me-3 text-primary' style={{ fontSize: "15px" }}><b>become a seller</b></span></div>
                <div><span className='btn mt-4  me-3 text-primary' style={{ fontSize: "15px" }}><b>more</b></span></div>
                <Link to="addtocart"> <div><span className='btn  mt-4  me-3 text-primary' style={{ fontSize: "15px" }}><b> cart</b></span></div></Link>
                <span className=' btn bi bi-box-arrow-right  mt-3' style={{ fontSize: "35px", color: "blue" }} onClick={handleSignOut} ></span>
              </div>
            </nav>
          </div>
        </div>
        <div style={{ position: "-webkit-sticky", position: "sticky", top: "0", backgroundColor: "white" }}>
          <div className='border-bottom-2 shadow d-flex justify-content-between mt-1 justify-content-center'>
            <Link to="category/grocery"><span className='btn  text-dark text-center' style={{ fontSize: "15px", marginLeft: "200px" }}><b>Grocery</b></span></Link>
            <Link to="category/grocery"><span className='btn  text-dark text-center' style={{ fontSize: "15px", marginLeft: "200px" }}><b>Grocery</b></span></Link>
            <Link to="category/mobiles"><span className='btn me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Mobiles</b></span></Link>
            <Link to="category/fashion"><span className='btn  me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Fashion</b></span></Link>
            <Link to="category/electronics"><span className='btn    me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Electronics</b></span></Link>
            <Link to="category/home"><span className='btn  me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Home</b></span></Link>
            <Link to="category/applinces"><span className='btn  me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Appliances</b></span></Link>
            <Link to="category/travel"><span className='btn  me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Travel</b></span></Link>
            <Link to="category/toys"><span className='btn  me-3 text-dark text-center' style={{ fontSize: "15px" }}><b>Toys,Beauty&more</b></span></Link>
            <Link to="category/bikes"><span className='btn  text-dark text-center' style={{ fontSize: "15px", marginRight: "200px" }}><b>Bikes</b></span></Link>
          </div>
        </div>
        <Routes>
          <Route path='/' element={<ShopperHome />} />
          <Route path="home" element={<ShopperHome />} />
          <Route path='category/:catname' element={<ShopperCategory />} />
          <Route path='details/:id' element={<ProductDetails />} />
          <Route path='invalid' element={<Invalid />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='addtocart' element={<Addtocart/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

