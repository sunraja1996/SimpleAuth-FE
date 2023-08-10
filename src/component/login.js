import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      sessionStorage.setItem('token', signin.data.token)
      sessionStorage.setItem('role', signin.data.role)

      console.log(signin.data.role);
      if (signin.data.role === 'admin') {
        navigate('/dashboard');
      } else if (signin.data.role === 'user') {
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

  
  const googleLogin = () => {
    try {

      window.location.href=(`${process.env.REACT_APP_APIURL}/auth/google`);
      
      //  window.open(`${process.env.REACT_APP_APIURL}/auth/google`, "_self");

      
    } catch (error) {
      toast.error('Internal Server Error', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  
  const githubLogin = () => {
    try {

      window.location.href=(`${process.env.REACT_APP_APIURL}/auth/github`);
      
      //  window.open(`${process.env.REACT_APP_APIURL}/auth/google`, "_self");

      
    } catch (error) {
      toast.error('Internal Server Error', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };
  
  const facebookLogin = () => {
    try {

      window.location.href=(`${process.env.REACT_APP_APIURL}/auth/facebook`);
      
      //  window.open(`${process.env.REACT_APP_APIURL}/auth/google`, "_self");

      
    } catch (error) {
      toast.error('Internal Server Error', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };



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

        <Link to='/signup'>
          <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant="success">
            New User ?   Sign up
          </Button>
        </Link> <br></br>

        <div className="divider text-center align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0 text-muted"><span>--------------       </span>OR<span>        --------------</span></p>
          </div>

<div className="d-flex justify-content-center align-items-md-center">
        <Button className='m-1 cus-bn' style={{ "background-color": '#DB4437'}} variant="danger" onClick={() =>googleLogin()}>
         <GoogleIcon/>Google
        </Button>


        <Button className='m-1 cus-bn' style={{"background-color": '#3b5998'}} variant="primary"  onClick={()=> facebookLogin()}>
         <FacebookIcon/> Facebook
        </Button>
        <Button className='m-1 cus-bn' style={{"background-color": '#333'}} variant="dark" onClick={() => githubLogin()}>
         <GitHubIcon/> Github
        </Button>
        </div>
      </Form>
      <ToastContainer />
    </div>

  );
}
export default Login;