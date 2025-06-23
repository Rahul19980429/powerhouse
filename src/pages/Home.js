
import React, { useEffect, useContext } from 'react'
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { fetchClient } from '../redux/slices/ClientSlice'
import { fetchClientWithPlan } from '../redux/slices/ClientWithGymPlanSlice'
import { fetchGymPlan } from '../redux/slices/GymPlanSlice'
import { Link } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const client = useSelector((state) => state.client)
  const gymPlan = useSelector((state) => state.gymplan)
  const clientWithPlan = useSelector((state) => state.clientwithplan)

  let navigate = useNavigate();
  let active;

  const a = useContext(Context);
  const { setError, handleLogout, activeStatusUser,seteditAccess} = a;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      handleLogout()
      navigate('/login');
    }
    else {
     
      active = JSON.parse(localStorage.getItem('user')).active;
      if (active === false) {
        setError({ 'error': 'YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT' })
        handleLogout()
        navigate('/login');
      }
      else {
        dispatch(fetchClientWithPlan())
        dispatch(fetchClient())
        dispatch(fetchGymPlan())
        activeStatusUser()
       
      }

    }


  }, [])

  if((client.status || clientWithPlan.state || gymPlan.status) ==='loading'){
    return(
      <Spinner/>
    )
  }
  return (
    (!localStorage.getItem('token')) || active === false ? "" :
     
        <div className='container mt-4 text-danger '>

          <div className='row'>
            <h4 className='text-center fw-bold' > WELCOME TO THE 'G<span className='text-white '>YM</span> F<span className='text-white '>AC</span>TORY'  </h4>

            <div className='col-lg-5'>
              <div className='card bg-dark bg-opacity-50 my-lg-4 my-1 p-3'>
                <div className='card-body btnlogIn'>
                  <h3 className='text-white text-capitalize'> HELLO  {JSON.parse(localStorage.getItem('user')).name}</h3>
                  <h5 className='text-capitalize'> OWNER OF '{JSON.parse(localStorage.getItem('user')).firmname}'</h5>
                  <div className='mt-4'>
                    <Link to="/subscriptedClient" className='btn btnlogIn text-white me-lg-3 me-2 px-lg-2 p-1 fw-bold border-0'>SUB.CLIENT<br /><span className='fs-4 text-danger'>{clientWithPlan.data.length}</span></Link>
                    <Link to="/addnew" className='btn btnlogIn text-white me-lg-3 me-2 px-lg-2 p-1 fw-bold border-0'>CLIENT<br /><span className='fs-4 text-danger'>{client.data.length}</span></Link>
                    <Link to="/createGymPlan" className='btn btnlogIn text-white   px-lg-2 p-1 fw-bold border-0'>GYM PLAN<br /><span className='fs-4 text-danger'>{gymPlan.data.length}</span></Link>
                  </div>

                </div>
              </div>
              <div className='card bg-dark bg-opacity-50 my-2 p-3'>
                <div className='card-body btnlogIn'>
                  <h5 className='text-white'> Here you can manage
                    your gym easily like create  monthly gym plan,
                    Add new gym client and select a perfect plan <span className='text-danger'>'any time any where'</span>. </h5>
                </div>
              </div>

            </div>

            < div className="col-lg-6 offset-lg-1">
              <div className='card bg-dark bg-opacity-50 my-lg-4 my-2 p-4'>
                <div className='card-body btnlogIn'>
                  <h4 className='text-white'>IMPORTANT INSTRUCTION</h4>
                  <h6 className='my-3'>Step 1: First you have to create gym plan for your clients <br /> Click on 'ADD GYM PLAN' button</h6>
                  <h6 className='my-3 text-white'>Step 2: Now, You have to create  your client <br /> Click on 'ADD NEW CLIENT' button</h6>
                  <h6 >Step 3: To check your client with gym subscription <br /> Click on 'SUBSCRIPTION CLIENT' button</h6>

                </div>
              </div>

              <div className='card bg-dark bg-opacity-50 my-2 px-3'>
                <div className='card-body'>
                  <h3 className=" fw-bold  text-white text-center btnlogIn my-1" ><span className='text-danger '>G</span>YM <span className='text-danger'>F<span className='text-white'>AC</span>TORY </span></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Home
