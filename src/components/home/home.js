import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export function ShopperHome(){ 

    const [cookie,setCookie,removeCookie]=useCookies();
    const navigate =useNavigate();

    const mystyle={
        height:"80px",
     width:"80px"
    }

    useEffect(()=>{
        if(cookie.username == undefined){
            navigate("/login");
        }
    });

    
    return(
        <div className='container-fluid'>
            
        <div className='border-bottom-2 shadow d-flex justify-content-between mt-1 justify-content-center' >
            <Link to="category/grocery" ><div className='text-center' style={{marginLeft:"120px"}}>
                <div>
                        <img src='glocery.jpg' style={mystyle}/>
                    </div>
                    <div>
                        <span  className='btn'>Grocery</span>
                    </div>
                </div></Link>
            <Link to="category/mobiles" ><div className='text-center'> 
                <div>
                    <img src='mobile.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span className='btn' >Mobiles</span>
                </div>
                </div></Link>
            <Link to="category/fashion"><div className='text-center'>
                <div>
                    <img src='fashion.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span  className='btn' >Fashion</span>
                </div>
                </div></Link>
            <Link to="category/electronics"  ><div className='text-center'>
                <div>
                    <img src='electronics.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span   className='btn' >Electronics</span>
                </div>
            </div></Link>
            <Link to="category/home"><div className='text-center'>
                <div>
                    <img src='home.jpg' style={mystyle}/>
                </div>
                <div>
                    <span  className='btn'>Home</span>
                </div>
            </div></Link>
            <Link to="category/applinces"><div className='text-center'>
                <div>
                    <img src='applinces.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span className='btn' >Appliances</span>
                </div>
            </div></Link>
            <Link to="category/travel"><div className='text-center'> 
                <div>
                    <img src='travel.png' style={mystyle}/>
                </div>
                <div>
                    <span className='btn'>Travel</span>
                </div>
            </div></Link>
           <Link to="category/offer" ><div className='text-center'> 
                <div>
                    <img src='offers.jpg' style={mystyle}/>
                </div>
                <div>
                    <span className='btn'>Top Offers</span>
                </div>
            </div></Link> 
            <Link to="category/toys"><div className='text-center'> 
                <div>
                    <img src='toys.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span className='btn'>Beauty, toys & more</span>
                </div>
            </div></Link>
            <Link to="category/bikes"><div className='text-center' style={{marginRight:"120px"}}> 
                <div>
                    <img src='bikes.jpg'  style={mystyle}/>
                </div>
                <div>
                    <span className='btn' >Two Wheelers</span>
                </div>
            </div></Link>
        </div>
        <div className='mt-3'>
                <img src="https://www.karobargain.com/wp-content/uploads/2021/12/flipkart-upcoming-sale.webp" className='w-100 shadow border border-dark' height="100px" />
        </div>
        <div className='mt-3'>
        <Carousel  variant="dark">
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100"
                    src="banner1.png"
                    height="250px"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100"
                    src="banner2.png"
                    height="250px"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100"
                    src="banner3.png"
                    height="250px"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1500}>
                    <img
                    className="d-block w-100"
                    src="banner4.png"
                    height="250px"
                    />
                </Carousel.Item>
        </Carousel>
        </div>
        </div>
    )
}