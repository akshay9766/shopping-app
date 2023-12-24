import axios from "axios";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";



export function Register() {

    const navigate = useNavigate();
    const [users, setUsers] = useState();
    const [userError, setUserError] = useState();

    useEffect(() => {
        axios({
            method: "get",
            url: "http://127.0.0.1:5000/users"
        }).then(response => {
            setUsers(response.data);
        })
    });


    function verifyUser(e) {
        for (var user of users) {
            if (user.user_name === e.target.value) {
                setUserError("UserName is already exist,try another one");
            } else {
                setUserError("");
            }
        }
    }

    return (
        <div className="container-fluid">
            <Formik
                initialValues={{
                    userid: '',
                    fullname: '',
                    username: '',
                    password: '',
                    Email: '',
                    Mobile: '',
                    adress: '',
                    pincode: ''
                }}

                validationSchema={
                    yup.object({
                        userid: yup.number().required("user id is required"),
                        fullname: yup.string().required("first name is required"),
                        username: yup.string().required("User Name is required"),
                        password: yup.string().required("password is required"),
                        Email: yup.string().email("Please enter valid email idd").required("email id is required"),
                        Mobile: yup.string().required("mobile no. is required").matches(/\+91\d{10}/, "mobile no. must in Indian format"),
                        adress: yup.string().required("Adress is required"),
                        pincode: yup.number().required("pincode is required")

                    })
                }

                onSubmit={
                    (values) => {
                        axios({
                            method: "post",
                            url: "http://127.0.0.1:5000/registeruser",
                            data: values
                        }).then(() => {
                            alert("Registration successfull...");
                            navigate("/login");
                        })

                    }
                }
            >
                {
                    <Form className="border border-dark p-3 border-4 rounded-4" style={{ width: 350, marginLeft: 600, marginTop: 10 }}>
                        <div className="text-center">
                            <h2 className="bi bi-person-fill" style={{ color: 'blue' }}> User Registration</h2>
                        </div>
                        <dl >
                            <dt>User ID</dt>
                            <dd><Field type="number" name="userid" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="userid" /></dd>
                            <dt>Full Name</dt>
                            <dd><Field type="text" name="fullname" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="fullname" /></dd>
                            <dt>User Name</dt>
                            <dd><Field type="text" onKeyUp={verifyUser} name="username" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="username" /></dd>
                            <dd className="text-danger">{userError}</dd>
                            <dt>Password</dt>
                            <dd><Field type="text" name="password" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="password" /></dd>
                            <dt>Email</dt>
                            <dd><Field type="text" name="Email" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="Email" /></dd>
                            <dt>Mobile</dt>
                            <dd><Field type="text" name="Mobile" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="Mobile" /></dd>
                            <dt>Adress</dt>
                            <dd><Field type="text" name="adress" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="adress" /></dd>
                            <dt>Pincode</dt>
                            <dd><Field type="number" name="pincode" style={{ width: 300 }} /> </dd>
                            <dd className="text-danger"><ErrorMessage name="pincode" /></dd>
                        </dl>
                        <div className="text-center p-2">
                            <button className="btn btn-primary">Register</button>
                            <p><Link to="/login">Existing user?</Link></p>
                        </div>
                    </Form>
                }

            </Formik>
        </div>
    )
}