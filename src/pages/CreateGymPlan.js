import React, { useState, useContext, useEffect } from 'react'
import Gymplan from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Spinner from '../MyComponents/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { DeleteGymPlan, EditGymPlan, InsertNewGymPlan, fetchGymPlan, setPlanError } from '../redux/slices/GymPlanSlice'

const CreateGymPlan = () => {
  const dispatch = useDispatch();
  const gymPlan = useSelector((state) => state.gymplan)
  let navigate = useNavigate();
  let active;

  const a = useContext(Gymplan);
  const { setError, handleLogout, activeStatusUser, seteditAccess } = a;


  const [input, setInput] = useState({ planMonth: '', planFee: '', planDesc: '' });
  const onChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })

  }
  const submit = (e) => {
    e.preventDefault()
    if (!input.planMonth || !input.planDesc || !input.planFee) {
      alert("Empty field is not allowed")
    }
    else {
      // createNewPlan(input.planMonth, input.planFee, input.planDesc)
      dispatch(InsertNewGymPlan(input))

      setInput({ planMonth: '', planFee: '', planDesc: '' })
    }

  }
  const keypress = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value = "";
    }
  }
  if (gymPlan.error.length !== 0) {
    setTimeout(() => {
      dispatch(setPlanError([]))
    }, 2500);
  }

  const [editBtnValue, seteditBtnValue] = useState({ value: false, id: '' })
  const editClientBtn = (data) => {
    setInput({ planMonth: data.plan, planFee: data.planfee, planDesc: data.plandesc })
    seteditBtnValue({ value: true, id: data._id });
  }

  const clearBtnClick = () => {
    setInput({ planMonth: '', planFee: '', planDesc: '' });
    seteditBtnValue({ value: false, id: '' });
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
        dispatch(fetchGymPlan())
        activeStatusUser()
      }

    }


  }, [])

  if (gymPlan.status === 'loading') {
    return (
      <Spinner />
    )
  }
  return (
    (!localStorage.getItem('token')) || active === false ? "" :

      <div>
        <div className='container mt-5'>
          <div className='row px-3'>
            <div className='col-lg-4 col-12 px-1 px-lg-3 card setbgImg bg-dark bg-opacity-75'>
              <h4 className='my-4 text-danger text-center'>CREATE GYM PLAN HERE </h4>
              <div className='card-body'>
                <form onSubmit={submit}>
                  <div className="input-group mb-3  border border-white rounded-1 ">
                    <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar2-date text-danger" viewBox="0 0 16 16">
                      <path d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
                    </svg></span>
                    <input autoComplete='off' onKeyUp={keypress} type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Plan eg(6) month' onChange={onChange} value={input.planMonth} maxLength={2} id="planMonth" name="planMonth" aria-describedby="emailHelp" />

                  </div>
                  <div className="input-group mb-3 border border-white rounded-1">
                    <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-currency-rupee text-danger" viewBox="0 0 16 16">
                      <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4v1.06Z" />
                    </svg></span>
                    <input autoComplete='off' onKeyUp={keypress} type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Plan Fee' onChange={onChange} value={input.planFee} id="planFee" name="planFee" aria-describedby="emailHelp" />

                  </div>
                  <div className="input-group mb-3 border border-white rounded-1">
                    <span className=" bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-text-fill text-danger" viewBox="0 0 16 16">
                      <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z" />
                    </svg></span>
                    <input autoComplete='off' type="text" className="setbgImg text-white  border-0 form-control" placeholder='Enter Descruption' onChange={onChange} value={input.planDesc} id="planDesc" name="planDesc" />
                  </div>
                  <div className="input-group mb-3 text-danger justify-content-center">
                    {gymPlan.error.error ? gymPlan.error.error : '' || gymPlan.error.errors ? gymPlan.error.errors[0].msg : ''}
                  </div>
                  <div className="d-flex gap-2 mt-2 justify-content-center">

                    {editBtnValue.value ? '' : <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={!input.planDesc || !input.planFee || !input.planMonth ? true : false} type="submit">Create</button>}
                    {editBtnValue.value ? <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={!input.planDesc || !input.planFee || !input.planMonth ? true : false} onClick={() => dispatch(EditGymPlan(input, editBtnValue.id))} type="button" >Update</button> : ''}
                    <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 ms-3" disabled={!input.planDesc && !input.planFee && !input.planMonth ? true : false} type="button" onClick={() => clearBtnClick()}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>

            <div className='col-lg-6 offset-lg-2 mt-5 mt-lg-0'>

              <h4 className=' text-center text-lg-start text-danger' > ADDED GYM PLAN</h4>

              <hr className='mb-0' />
              <div className='setClient px-3 py-2 '>
                {gymPlan.data.length === 0 ? <h5 className='text-danger'>Not Found</h5> :
                  gymPlan.data.map((clientdata) => {
                    return (
                      <div className="card mb-4 setbgImg text-white bg-dark bg-opacity-50 setBoxShadow " key={clientdata._id}>
                        <div className="card-body">
                          <div className='d-flex'>
                            <p className="card-title "> Plan Name: {clientdata.plan} month</p>
                            <button className='btn btn-sm   btnlogIn ms-auto border-0' onClick={() => editClientBtn(clientdata)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill text-danger" viewBox="0 0 16 16">
                              <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                            </svg></button>
                            <button className='btn btn-sm   btnlogIn ms-3 border-0' onClick={() => dispatch(DeleteGymPlan(clientdata._id))}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill text-danger" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg></button>

                          </div>
                          <p className="card-text  mb-1">Plan Fee: {clientdata.planfee}</p>
                          <p className="card-text ">Plan Descruption: {clientdata.plandesc}</p>
                        </div>
                      </div>
                    )

                  }).reverse()}
              </div>
            </div>
          </div>
        </div>

      </div>
  )
}

export default CreateGymPlan
