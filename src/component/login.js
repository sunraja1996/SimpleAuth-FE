import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {

  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate()

  let login = async () => {
    const signin = await axios.post(`${process.env.REACT_APP_APIURL}/users/login`, { email, password })
    if (signin.data.statusCode === 200) {
      toast.success('Login Successfull !', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      sessionStorage.setItem('token',signin.data.token)
      sessionStorage.setItem('role',signin.data.role)

      console.log(signin.data.role);
      if (signin.data.role === 'admin') {
        navigate('/dashboard');
      } else if(signin.data.role === 'user'){
        navigate('/profile')
        
      }

      

    } else {
      toast.error(signin.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }

  return (

    <div className='login-wrapper'>


      <Form>
        <h1 className='head'>Login</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant="danger" onClick={() => login()} >
          Submit
        </Button>

        <Link to = '/signup'>
        <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant="success">
          New User ?   Sign up
        </Button>
        </Link>

      </Form>
      <ToastContainer />
    </div>

  );
}



export default Login;