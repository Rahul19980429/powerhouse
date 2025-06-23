import React, { useEffect, useContext } from 'react'
import Context from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteClientWithPlan, fetchClientWithPlan, setFilterData } from '../redux/slices/ClientWithGymPlanSlice'


const SubscriptedClient = () => {

  const dispatch = useDispatch();
  const clientWithPlan = useSelector((state) => state.clientwithplan)
  let navigate = useNavigate();
  let active;
  const a = useContext(Context);
  const { 
    updateActiveClient, setDatefunc, whatsAppApi,
    setError, handleLogout, activeStatusUser,seteditAccess } = a;



  let todayDate = new Date();

  let msg = '';

  const setdateAsgetTime = (date) => {
    let setDate = new Date(date);
    let date1 = new Date(setDate.getFullYear(), setDate.getMonth() + 1, setDate.getDate()).getTime();
    return date1;
  }

  // All click btn
  const allBtnClick = () => {
    dispatch(fetchClientWithPlan())
    document.getElementById("runBtn").disabled = false;
    document.getElementById("expireBtn").disabled = false;
    document.getElementById('sendAllMsg').classList.add('d-none');
  }

  // expire click btn
  const filterExpire = async () => {

    let res = await clientWithPlan.data.filter((data) => { return setdateAsgetTime(todayDate) > compareDates(data.main.date, data.gymplan.plan) })
    console.log(res)
    dispatch(setFilterData(res))
    document.getElementById('sendAllMsg').classList.remove('d-none');
    document.getElementById("runBtn").disabled = true;

  }


  // running plan click btn

  const filterRunPlan = async () => { 
    let res = await clientWithPlan.data.filter((data) => {
       return setdateAsgetTime(todayDate) <= compareDates(data.main.date, data.gymplan.plan) })
    dispatch(setFilterData(res))
    document.getElementById('sendAllMsg').classList.add('d-none');
    document.getElementById("expireBtn").disabled = true;

  }

  // date compare function

  const compareDates = (dateCompareWith, plan_of) => {
    let date = new Date(dateCompareWith);
    let getDate = date.getDate();
    let uptomonth = ((date.getMonth() + 1) + parseInt(plan_of) > 12 ? (((date.getMonth() + 1) + parseInt(plan_of)) - 12) : ((date.getMonth() + 1) + parseInt(plan_of)));
    let uptoyear = ((date.getMonth() + 1) + parseInt(plan_of)) > 12 ? date.getFullYear() + 1 : date.getFullYear();
    let tobecomp = new Date(uptoyear, uptomonth, getDate).getTime();
    return tobecomp;

  }

  const filterSub = async (e) => {
    let data;
    e.preventDefault();
    let searchinput = await e.target.value;
    if (searchinput === "") {
      dispatch(fetchClientWithPlan())
    }

    if (searchinput !== "") {
      data = clientWithPlan.data.filter((data) => (data.client.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1 || data.client.contact.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1));
      if (data.length === 0) {
        dispatch(fetchClientWithPlan())
      }
    }


    if (data) {
      dispatch(setFilterData(data))
    }
  }


  const sendMsgToAllExpirePlan = (dataArray) => {
    let apikey = JSON.parse(localStorage.getItem('user')).apikey;
    if (apikey !== '') {
      dataArray.map((subData) => {
        msg = `Hey ${subData.client.name} this message from ${JSON.parse(localStorage.getItem('user')).firmname}. Your  ${subData.gymplan.plan} month (${subData.gymplan.plandesc}) gym plan (${setDatefunc(subData.main.date)} to ${setDatefunc(subData.main.uptodate)}) is expire now. Please renewal your plan. Thank you have a nice day.`
        whatsAppApi(subData.client.contact, msg)

      })
      alert('Send Messages Done')
    }
    else {
      alert('Message Not Send');
    }

  }

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
        activeStatusUser()
      }

    }


  }, [])
  if (clientWithPlan.status === 'loading') {
    return (
      <Spinner />
    )
  }

  const sendMsgToExpirePlan = (clientData) => {
    msg = `Hey ${clientData.client.name} this message from ${JSON.parse(localStorage.getItem('user')).firmname}. Your ${clientData.gymplan.plan} month (${clientData.gymplan.plandesc}) gym plan (${setDatefunc(clientData.main.date)} to ${setDatefunc(clientData.main.uptodate)}) is expire now. Please renewal your plan. Thank you have a nice day.  `
    whatsAppApi(clientData.client.contact, msg)
  }

  return (
    (!localStorage.getItem('token')) || active === false ? "" :

      <>

        <div className='container mt-4'>

          <div className='row'>
            <h5 className='pt-2 text-danger text-center fw-bold'>'CLIENT WITH GYM PLAN'</h5>
          </div>
          <div className='row pb-3 pt-1 mt-3 mt-lg-1'>
            <div className='col-12 col-lg-8 text-center text-lg-start'>
              <button className='btn btn-sm btnlogIn text-danger me-3 fw-bold' id='expireBtn' onClick={() => filterExpire()}> EXPIRED</button>
              <button className='btn btn-sm btnlogIn text-danger me-3 fw-bold' onClick={() => allBtnClick()}> ALL </button>
              <button className='btn btn-sm btnlogIn text-danger me-3 fw-bold' id='runBtn' onClick={() => filterRunPlan()}> RUNNING</button>
              <button className='btn btn-sm btnlogIn text-danger me-3 fw-bold d-none setBoxShadow2' id='sendAllMsg' onClick={() => sendMsgToAllExpirePlan(clientWithPlan.data)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill mb-1" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg> TO ALL</button>
            </div>
            <div className='col-12 col-lg-4 mt-4 my-lg-0 px-4'>
              <input className="searchinputSet form-control me-2 setbgImg btnlogIn border-0 text-white border-danger " onKeyUp={filterSub} type="text" placeholder="Search" aria-label="Search" />
            </div>

          </div>


          <div className='row py-2 text-white setClient '>

            {clientWithPlan.data.length === 0 ? <h4 className='text-center text-danger my-3'>NOT FOUNT</h4> :
              clientWithPlan.data.map((subData) => {

                if (subData.main.plan_active !== false && setdateAsgetTime(todayDate) > setdateAsgetTime(subData.main.uptodate)) {
                  updateActiveClient(subData.main._id)
                }




                return (

                  <div className='col-lg-4 col-12' key={subData.main._id}>
                    <div className={`card my-3 cardhover setbgImg bg-dark bg-opacity-75 setBoxShadow ${setdateAsgetTime(todayDate) > setdateAsgetTime(subData.main.uptodate) ? 'setBoxShadow2' : ''} `} id={`${subData.main._id}`}>
                      <div className="card-body">
                        <div className='row'>
                          <div className=' col-12 position-relative text-capitalize'>
                            <div className='d-flex'>
                              <h5 className="text-danger"> NAME: {subData.client.name}</h5>

                              <button className='btn btn-sm   ms-auto me-2 btnlogIn border-0' onClick={() => { dispatch(DeleteClientWithPlan(subData.main._id)) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-danger" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                              </svg></button>
                            </div>

                            <p className="card-text fw-bold mb-1"><small>ADDRESS: {subData.client.address}</small></p>

                            <div className='d-flex'>
                              <p className="card-text fw-bold mb-1"> <small>CONTACT: {subData.client.contact}</small></p>
                              {setdateAsgetTime(todayDate) > setdateAsgetTime(subData.main.uptodate) ?
                                <button className='btn btn-sm   ms-auto me-2 btnlogIn border-0 text-danger setBoxShadow2 border-0 float-end py-0 mt-1' onClick={() => { sendMsgToExpirePlan(subData) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                </svg> </button> : ''}
                            </div>
                            <div className='row'>
                              <hr className='border border-2 m-0 border-danger' />
                              <div className=' col-lg-12 col-12'><small><i className=''><span className='text-danger'>{subData.gymplan.plan}</span> Month <span className='text-danger '>{subData.gymplan.plandesc} rs:{subData.gymplan.planfee}</span> Package</i></small></div>
                              <div className=' col-lg-12 col-12'><small><i className=''>{setDatefunc(subData.main.date)} to <span className='text-danger'>{setDatefunc(subData.main.uptodate)}</span></i></small>

                                {setdateAsgetTime(todayDate) > setdateAsgetTime(subData.main.uptodate) ?
                                  <Link to={`/addnew/plan/${subData.main._id}`} className='btn btn-sm text-danger fw-bold ms-auto setBoxShadow2 border-0 float-end py-0 mt-1'>
                                    Update Plan
                                  </Link> : ''}
                              </div>

                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                )

              })}

          </div>
        </div>
      </>


  )
}

export default SubscriptedClient
