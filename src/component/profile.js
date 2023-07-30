import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Card from 'react-bootstrap/Card';
import PersonIcon from '@mui/icons-material/Person';
import defaultImage from '../Assests/img.jpg'



function Profile() {

  let [userProfile, setUserProfile] = useState({});
  let navigate = useNavigate();

  let logout = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    userprofile()
  }, [])



  let userprofile = async () => {
    let role = sessionStorage.getItem('role');
    let token = sessionStorage.getItem('token');
    if (token) {
      let res = await axios.get(`${process.env.REACT_APP_APIURL}/users/userprofile`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (res && res.data && res.data.statusCode === 200) {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setUserProfile(res.data.user)

        if (role === 'user') {
          navigate('/profile');
        } else {
          navigate('/dashboard');
        }
      }
      else {
        toast.error(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }

    } else {
      toast.error("No Token found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }



  return (

    <>
      <div>
        <div>
          <div className='d-flex justify-content-around '>
            <h1 className='text-center mb-0' style={{ fontFamily: "'Lugrasimo', 'cursive'", margin: '15px' }}>
              {userProfile.firstName ? `Profile - ${userProfile.firstName}` : 'Loading Profile...'}
            </h1>
            <div className='d-flex justify-content-around align-items-center'>
              <Button variant="warning" onClick={() => logout()}><ExitToAppIcon /> &nbsp; Log out</Button>&nbsp;
            </div>
          </div>
        </div>

        {userProfile.firstName && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card className='border border-success shadow p-3 mb-5 bg-white rounded' style={{ width: '18rem', margin: '15px', padding: '10px' }}>
            <Card.Img variant="top" src={userProfile.imageUrl || defaultImage} style={{width:'8rem', height:'8rem', objectFit:'cover', borderRadius:'50%'}} />
              <Card.Body>
                <Card.Title>{userProfile.firstName} {userProfile.lastName}</Card.Title>
                <Card.Text>
                  Email : {userProfile.email}
                </Card.Text>
                <hr></hr>
                <div className="d-flex justify-content-center align-items-center">
                  <Button variant="dark">
                    <PersonIcon /> &nbsp; {userProfile.role}
                  </Button>
                </div>

              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  )
}

export default Profile