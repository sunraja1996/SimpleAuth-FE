import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateUser() {
  let [fname, setFname] = useState('');
  let [lname, setLname] = useState('');
  let [email, setEmail] = useState('');
  let [role, setRole] = useState('');
  let [img, setImg] = useState('');
  let navigate = useNavigate();

  let location = useLocation();
  let userData = location.state?.userData || {};

  useEffect(() => {
    setFname(userData.firstName || '');
    setLname(userData.lastName || '');
    setEmail(userData.email || '');
    setRole(userData.role || '');
    setImg(userData.imageUrl || '');
  }, [userData]);

  const editUser = async (e) => {

    e.preventDefault();

    const userData = {
      email: email,
      firstName: fname,
      lastName: lname,
      role: role,
      imageUrl: img,
    };

    try {
      const edituser = await axios.put(`${process.env.REACT_APP_APIURL}/users/updateuser/${email}`, userData);

      if (edituser.data.statusCode === 200) {
        const updatedUserData = { ...userData, token: sessionStorage.getItem('token') };
        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
        toast.success('User Updated Successfully!', {
          position: 'bottom-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 2000);
      } else {
        toast.error(edituser.data.message, {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='signup-wrapper'>
      <Form>
        <h1 className='head'>Update User</h1>

        <Form.Group className='mb-3'>
          <Form.Label>First Name</Form.Label>
          <Form.Control type='text' placeholder='Enter your Firstname' value={fname} onChange={(e) => setFname(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control type='text' placeholder='Enter your Lastname' value={lname} onChange={(e) => setLname(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Update Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>user</option>
            <option>admin</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type='text' placeholder='Image Url from Drive' value={img} onChange={(e) => setImg(e.target.value)} />
        </Form.Group>

        <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant='danger' onClick={(e) => editUser(e)}>
          Update
        </Button>

        <Link to='/dashboard'>
          <Button className='m-1 cus-bn' style={{ "font-family": "'Lugrasimo', cursive" }} variant='success'>
            Back to Dashboard
          </Button>
        </Link>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default UpdateUser;
