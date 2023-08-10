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



function SocialProfile() {

    let [user, setUser] = useState({})
    const navigate = useNavigate();

    const getuser = async () => {

        try {

            const res = await axios.get(`${process.env.REACT_APP_APIURL}/login/success`, {
                withCredentials: true,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })

            if (res.data.statusCode === 200) {
                toast.success('Google Signin Successfull !', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
                setUser(res.data.user)
            } else {
                toast.error('Google Signin Failed', {
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

    }

    useEffect(() => {
        getuser();
    }, [])

    let logout = () => {
        sessionStorage.clear()
        navigate('/login')
    }

    return (
        <>
            <div>
                <div>
                    <div className='d-flex justify-content-around '>
                        <h1 className='text-center mb-0' style={{ fontFamily: "'Lugrasimo', 'cursive'", margin: '15px' }}>
                            {user.displayName}
                        </h1>
                        <div className='d-flex justify-content-around align-items-center'>
                            <Button variant="warning" onClick={() => logout()} ><ExitToAppIcon /> &nbsp; Log out</Button>&nbsp;
                        </div>
                    </div>
                </div>


                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Card className='border border-success shadow p-3 mb-5 bg-white rounded' style={{ width: '18rem', margin: '15px', padding: '10px' }}>
                        <Card.Img variant="top" src= {user.photos && user.photos[0] && user.photos[0].value ? user.photos[0].value : defaultImage}
                             style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%' }} />
                        <Card.Body>
                            <Card.Title>{user.displayName}</Card.Title>
                            {user.email ? (
                                <Card.Text>Email: {user.email}</Card.Text>
                            ) : (
                                <Card.Text>Username: {user.username}</Card.Text>
                            )}
                            <hr></hr>
                            <div className="d-flex justify-content-center align-items-center">
                                <Button variant="dark">
                                    {user.role ? (
                                <Card.Text> <PersonIcon /> &nbsp;   role: {user.role}</Card.Text>
                            ) : (
                                <Card.Text>ProfileURL: {user.profileUrl}</Card.Text>
                            )}
                                </Button>
                            </div>

                        </Card.Body>
                    </Card>
                </div>

            </div>
            <ToastContainer />
        </>
    )
}

export default SocialProfile