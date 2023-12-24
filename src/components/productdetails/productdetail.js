import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom"

export function ProductDetails(){
        const params =useParams();
        const [products,setProducts]=useState([]);
        const[cookie,setCookie,removeCookie]=useCookies();
        const navigate =useNavigate();

    useEffect(()=>{
            if(cookie.username==undefined){
                navigate("/login");
            }

        axios({
            method:"get",
            url:`http://127.0.0.1:5000/details/${params.id}`
        }).then(response=>{
            setProducts(response.data);
            setCookie("productId",params.id);
        })
    },[]);

   

    return(
        <div className="container-fluid">
                {
                    products.map(product=>
                        <div className="row shadow mt-4">
                            <div className="col-1 mt-1">
                                    <div className="d-flex flex-column">
                                        {
                                            product.images.map(image=>
                                                <img src={image} height="80px" width="80px" className="m-2"/>)
                                        }
                                    </div>
                            </div>
                            <div className="col-4 mt-1 b">
                                    <div className="mt-2 text-center mb-4">
                                        <img src={product.images[0]} className="w-100" />
                                        <span className="btn btn-warning btn-lg text-white me-2 mt-4" style={{width:"150px"}} >Add to cart</span>
                                        <span className="btn btn-danger btn-lg text-white mt-4" style={{width:"150px"}}>Buy Now</span>
                                    </div>
                            </div>
                            <div className="col-7 mt-1 ">
                            <dl>
                                <dt></dt>
                                <dd><h2>{product.Name}</h2></dd>
                                <dd><div className="d-flex">
                                         <p className="bg-success text-center border rounded" style={{width:"40px",height:"25px"}}><b>{product.rating.rate}</b></p>
                                         <img src="https://toppng.com/uploads/preview/3d-gold-star-png-file-gold-metal-star-11562910701ftdxmaqgqd.png" height="20px" width="20px"/>
                                         <p>[{product.rating.count}]</p>
                                         <img src="https://www.adgully.com/img/800/68264_fl.png.jpg" className="mt-1 ms-2" width="100px" height="30px"/>
                                    </div></dd>
                                <dt className="text-success">Special Price</dt>
                                <dd className="d-flex"><h2>&#8377;{product.price.toLocaleString('en-US')}</h2><del className="ms-4 mt-2">&#8377; {((product.price*0.5)+parseInt(product.price)).toLocaleString('en-IN')}</del><p className="ms-2 text-success mt-2">20% off</p></dd>
                                <dt>Available Offers</dt>
                                <dd>{
                                        product.offers.map(offer=>
                                            <ul style={{listStyleImage: "url(../tag.jpg)"}}>
                                                <li className="m-0 p-0">{offer} <a href="#">T&C</a></li>
                                            </ul>)
                                    }
                                    <a href="#" >view more offers</a>
                                </dd>
                                <dd></dd>
                            </dl>
                            </div>
                            
                            <div>
                                <Link to={'/category/' + product.category} className="btn btn-outline-primary mb-4 " style={{width:"100px"}}>Back</Link>
                            </div>
                            </div>)
                        
                }
        </div>
    )
}

