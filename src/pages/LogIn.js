import React, { useEffect } from 'react'
import LoginForm from '../MyComponents/LogInForm'
import { useNavigate } from 'react-router-dom';


const LogIn = () => {
    let navigate = useNavigate();
   
    useEffect(() => {
        if (localStorage.getItem('token')) {
            let active =JSON.parse(localStorage.getItem('user')).active?JSON.parse(localStorage.getItem('user')).active:''
            if (active===false) {
                localStorage.removeItem('token');
                localStorage.removeItem('user')
               navigate('/login')
            }
            else{
                navigate('/')
            }
        }
        else {
            navigate('/login');
        }

    }, [])

    return (
        <div className='container mt-5 px-5'>
            <div className='row'>
           
                <div className='col-lg-4 offset-lg-4 card setbgImg bg-dark bg-opacity-75 mt-5'  >
                    <div className='card-body text-center px-3 pt-4'>
                       <LoginForm/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LogIn
