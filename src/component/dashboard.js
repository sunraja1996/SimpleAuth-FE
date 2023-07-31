import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import defaultImage from '../Assests/img.jpg'
import './dashboard.css'


function Dashboard() {



  let [data, setData] = useState([]);
  let navigate = useNavigate();

  let allusers = async()=>{
    let token = sessionStorage.getItem('token');
    if(token){
      let res = await axios.get(`${process.env.REACT_APP_APIURL}/users/allusers`, {
        headers:{
          authorization: `Bearer ${token}`
        }
      })

      if(res.data.statusCode === 200){
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
        setData(res.data.users)
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
        setTimeout(()=>{
          navigate('/login')
        }, 2000)
      }

    }else {
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
      setTimeout(()=>{
        navigate('/login')
      }, 2000)
    }
  }

  useEffect(()=>{
    allusers()
  },[])

  const handleDelete = async (email) => {
    let token = sessionStorage.getItem('token');

    if(token){
      let response = await axios.delete(`${process.env.REACT_APP_APIURL}/users/deleteuser/${email}`, {
        headers:{
          authorization: `Bearer ${token}`
        }
      }); 

      if(response.data.statusCode === 200){
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setData(response.data.users)
        allusers();
      }     
      else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      }

    }else {
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
    }
  }



  const handleEdit = (user) => {
    navigate('/edituser', { state: { userData: user } });
  };

  let logout = () => {
    sessionStorage.clear();
    navigate('/login')
  } 




  return (
    <div>


      <div className='d-flex justify-content-around '>
        <h1 className='text-center' style={{ fontFamily: "'Lugrasimo', 'cursive'", margin: '15px' }}>Dashboard</h1>
        <div className='d-flex justify-content-around align-items-center'>
        <Button variant="primary" onClick={()=>allusers()}><RefreshIcon /> &nbsp; Refresh</Button>&nbsp;
        <Link to='/adduser'>
        <Button variant="dark"> <PersonAddAltIcon/> &nbsp; Add User</Button> &nbsp;
        </Link>
        <Button variant="warning" onClick={()=> logout()}><ExitToAppIcon /> &nbsp; Log out</Button>&nbsp;
        
        
      </div>
      </div>

      <hr></hr>

      <div className="row row-cols-1 row-cols-md-4 g-2">
      {
        data && data.length > 0 ? (
      data.map((e,i) => {
        return (
          <>
          <div className="col" key={i}>
          <Card className='border border-success shadow p-3 mb-5 bg-white rounded' style={{ width: '18rem', margin: '15px', padding: '10px' }}>
         <Card.Img variant="top" src={e.imageUrl || defaultImage} style={{width:'8rem', height:'8rem', objectFit:'cover', borderRadius:'50%'}} />

    <Card.Body>
    <Card.Title>{e.firstName} {e.lastName}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted text-uppercase">{e.role}</Card.Subtitle>
    <Card.Text>
      Email : {e.email}
    </Card.Text>
    

    <hr></hr>

    <Button variant="secondary" onClick={() => handleEdit(e)}>Edit &nbsp; <EditIcon/></Button> &nbsp;

    <Button variant="danger" onClick={() => handleDelete(e.email)}>Delete &nbsp; <DeleteForeverIcon/></Button>
  </Card.Body>
  </Card>
  </div>
  </>
  )
      })
        ) : (
          <p>Loading Data ....</p>
        )
    }
    </div>



    <ToastContainer/>

     
    </div>
    
  )
}

export default Dashboard