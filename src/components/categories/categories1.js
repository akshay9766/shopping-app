import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

export function ShopperCategory() {
    const params = useParams();
    const [products, setProducts] = useState([]);
    const [banner1, setbanner1] = useState([]);
    const [banner2, setbanner2] = useState([]);
    const [poster, setposter] = useState([]);
    const navigate= useNavigate();
    const [cookie,setCookie,removeCookie]=useCookies();


    useEffect(()=>{
        if(cookie.username==undefined){
            navigate("/login");
        }
    });
    useEffect(() => {
        axios({
            method: "get",
            url: `http://127.0.0.1:5000/category/${params.catname}`
        })
            .then(response => {
                setProducts(response.data);
            })
    }

    );
    useEffect(() => {

        axios({
            method: "get",
            url: `http://127.0.0.1:5000/banner1/${params.catname}`
        })
            .then(response => {
                setbanner1(response.data);
            })
    }

    );

    useEffect(() => {

        axios({
            method: "get",
            url: `http://127.0.0.1:5000/banner2/${params.catname}`
        })
            .then(response => {
                setbanner2(response.data);
            })
    }

    );

    useEffect(() => {

        axios({
            method: "get",
            url: `http://127.0.0.1:5000/poster/${params.catname}`
        })
            .then(response => {
                setposter(response.data);
            })
    }

    );




    return (
        <div className="container-fluid">
            <div className="mt-2 mb-3 border-dark">
                {
                    banner1.map(b1 =>
                        <div className='mt-3 border border-dark'>

                            <Carousel variant="dark">
                                {
                                    b1.images.map(b =>
                                        <Carousel.Item interval={1000}>
                                            <div>
                                                <img className="d-block w-100" height="300px" src={b} />
                                            </div>
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>

                        </div>)
                }
            </div>
            <div className="m-3 border border-dark">
                <img src="https://marketplace.canva.com/EAE1gjmdjkQ/3/0/1600w/canva-yellow-and-black-super-weekend-sale-banner-qccqCrq6Umg.jpg" height="350" className="w-100" />
            </div>

            <div className="mt-3 mb-3 border-dark">
                {
                    banner2.map(b2 =>
                        <div className='mt-3 border border-dark'>

                            <Carousel variant="dark">
                                {
                                    b2.images.map(c =>
                                        <Carousel.Item interval={1200}>
                                            <div>
                                                <img className="d-block w-100" height="300px" src={c} />
                                            </div>
                                        </Carousel.Item>
                                    )
                                }
                            </Carousel>

                        </div>)
                }
            </div>

            <div className="m-3 border border-dark">
                {
                    poster.map(p =>
                        <img src={p.image} height="400px" className="w-100" />
                    )
                }
            </div>

            <div className="d-flex flex-wrap justify-content-between">
                {
                    products.map(product =>
                        <Link to={'/details/' + product.productId} className="btn">
                            <div className="card m-1" style={{ width: '230px' }}>
                                <img src={product.images[0]} className="card-img-top" height="300" />
                                <div className="card-header overflow-hidden" style={{ height: '40px' }}>
                                    <p key={product.Name}>{product.Name}</p>
                                </div>
                                <div className="card-footer">
                                    <div className="d-flex"><h4>&#8377;{product.price.toLocaleString('en-US')} </h4><del className="ms-1">&#8377; {((product.price * 0.2) + parseInt(product.price)).toLocaleString('en-IN')}</del></div>
                                    <div className="d-flex w-100 overflow-hidden" style={{ width: "40px", height: "25px" }}><p className="bg-success text-center border-radius" style={{ width: "40px", height: "25px" }}><b>{product.rating.rate}</b></p> <img src="https://toppng.com/uploads/preview/3d-gold-star-png-file-gold-metal-star-11562910701ftdxmaqgqd.png" height="20px" width="20px" />
                                        <p>[{product.rating.count}]</p></div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}







