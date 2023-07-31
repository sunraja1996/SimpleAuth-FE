import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'

function Signup() {

  let [fname, setFname] = useState("")
  let [lname, setLname] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [img, setImg] = useState("")
  let navigate = useNavigate()

  let signup = async () => {

    const userData = {
      email: email,
      password: password,
      firstName : fname,
      lastName: lname,
      imageUrl:img
    };

    const signup = await axios.post(`${process.env.REACT_APP_APIURL}/users/signup`, userData)
    if (signup.data.statusCode === 200) {
      toast.success('Signup Successfull !', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(()=>{
        navigate('/login')
      }, 2000)

    } else {
      toast.error(signup.data.message, {
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
    <div className='signup-wrapper'>


      <Form>
        <h1 className='head'>Sign Up</h1>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your Firstname" onChange={(e) => setFname(e.target.value)}/>

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your Lastname" onChange={(e) => setLname(e.target.value)}/>

        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" placeholder="Image Url from Drive" onChange={(e) => setImg(e.target.value)}/>
        </Form.Group>

        <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant="danger" onClick={() => signup()} >
          Signup
        </Button>

        <Link to='/login'>
          <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant="success">
            Existing User? Login
          </Button>
        </Link>

      </Form>
      <ToastContainer />
    </div>
  )
}

export default Signup