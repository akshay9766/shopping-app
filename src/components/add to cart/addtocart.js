import axios from "axios";
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export function Addtocart(){

    const [id,setId]=useState();
    const [cookie,setCookie,removeCookie] = useCookies();

    useEffect(()=>{
        axios({
            method:"get",
            url:`http://127.0.0.1:5000/getcartdetails`
        }).then(response=>{
            setId(response.data)
            console.log(response.data);
            setCookie("id",3000);
        })
    },[]);
    return(
        <div className="container-fluid">
            <h1>cart items</h1>
            <div>
                {
                    id.map(keys=>
                        <div>
                            {
                            keys.productId.map(akshay=>
                                <h1>{akshay}</h1>
                                )
                        }
                            </div>
                        )
                }</div>            
        </div>
    )
}