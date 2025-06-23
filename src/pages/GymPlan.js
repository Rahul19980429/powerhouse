import React, { useEffect, useContext } from 'react'
import Context from '../context/Context';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { fetchGymPlan } from '../redux/slices/GymPlanSlice'


const GymPlan = () => {
  const dispatch = useDispatch();
  const gymPlan = useSelector((state) => state.gymplan)
  const a = useContext(Context);
  const { addClientWithSub,spinner,setError,handleLogout,seteditAccess } = a;

 
  useEffect(() => {
   
    if (localStorage.getItem('token') &&  JSON.parse(localStorage.getItem('user')).active===true) {
      dispatch(fetchGymPlan())
    }
    else {
      if (JSON.parse(localStorage.getItem('user')).active===false) {
        setError({ 'error': 'YOUR ACCESS IS STOPPED BY ADMIN PLEASE RENEWAL YOUR ACCOUNT' })
    }
      handleLogout()
      navigate('/login');
    }

  }, [])



  const url_id = useParams();
  const id = url_id.id
  const navigate = useNavigate();

  const addSubPlan = async (id, pid) => {
    await addClientWithSub(id, pid)

    navigate('/subscriptedClient')


  }

  return (
    spinner === 'true' ? <Spinner /> :
      <div className=' container  mt-5'>
        <div className='row'>
          {gymPlan.data.length === 0 ? <h4 className='text-center text-danger'>"Not Found"</h4> :
            gymPlan.data.map((plans) => {
              return <div className='col-lg-3 col-6 my-3 px-3' key={plans._id}><div className=' btn p-4 bg-dark bg-opacity-50 btnlogIn fw-bold  stn-sm mx-1 text-white' onClick={() => addSubPlan(id, plans._id)}>
                <span className='text-danger'>{plans.plan} Month Subscription</span>  <br />
                <span className='text-white'> {plans.planfee} Rupees </span><br />
                <span className='text-danger'> {plans.plandesc} </span>
              </div>
              </div>
            })}
        </div>
      </div>
  )
}

export default GymPlan
