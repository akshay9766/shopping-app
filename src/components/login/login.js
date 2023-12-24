import axios from "axios";
import { Formik ,Form,Field } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";

export function Login(){
    const params=useParams();
    const [cookie,setCookie,removeCookie]=useCookies();
    const navigate=useNavigate();
    return(
        <Formik
            initialValues={{
                username:'',
                password:''
            }}
            

            onSubmit={(values)=>{
                axios({
                    method:"get",
                    url:"http://127.0.0.1:5000/users"
                }).then(response=>{
                    for(var user of response.data){
                        if(user.username==values.username &&  user.password==values.password){
                                setCookie("username",user.username);
                                setCookie("password",user.password);
                                setCookie("name",user.name);
                                navigate("/home");
                                break;
                        }else{
                            navigate("/invalid")
                        }
                    }
                })
            }}
        >
            
            <Form className="border border-dark p-3 m-2" style={{width:230}}>
                <dl>
                    <dt>User Name</dt>
                    <dd><Field type="text" name="username"/></dd>
                    <dt>Password</dt>
                    <dd><Field type="text" name="password" /></dd>
                </dl>
                <button className="btn btn-primary">Login</button>
                <p><Link to="/register">New User?</Link></p>
            </Form>

        </Formik>
    )
}