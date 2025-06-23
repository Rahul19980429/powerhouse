import React, { useEffect, useContext, useState } from 'react'
import Client from '../MyComponents/Client'
import Context from '../context/Context';
import Spinner from '../MyComponents/Spinner';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchClient, setFilterClientData, InsertNewClient, setError, EditClient } from '../redux/slices/ClientSlice'

const AddNewClient = () => {
    const dispatch = useDispatch();
    const { data: client, status, error } = useSelector((state) => state.client)

    let navigate = useNavigate();


    let active;
    const a = useContext(Context);
    const { handleLogout, activeStatusUser, seteditAccess } = a;

    const [input, setInput] = useState({ name: '', address: '', contact: '' });
    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const submit = (e) => {
        e.preventDefault()
        if (!input.name || !input.address || !input.contact) {
            alert("Empty field is not allowed")
        }
        else {
            dispatch(InsertNewClient(input))
            setInput({ name: '', address: '', contact: '' })
        }

    }
    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
        }
    }
    if (error.length !== 0) {
        setTimeout(() => {
            dispatch(setError([]))
        }, 2500);
    }

    const filterClient = async (e) => {
        let data;
        e.preventDefault();
        let searchinput = await e.target.value;
        if (searchinput === "") {
            dispatch(fetchClient())
        }

        if (searchinput !== "") {
            data = client.filter((data) => (data.name.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1 || data.contact.toLowerCase().indexOf(searchinput.toLowerCase()) !== -1));
            if (data.length === 0) {
                dispatch(fetchClient())
            }
        }

        if (data) {
            dispatch(setFilterClientData(data))
        }
    }

    const [editBtnValue, seteditBtnValue] = useState({value:false,id:''})
    const editClientBtn = (data) => {
        setInput({ name: data.name, address: data.address, contact: data.contact })
        seteditBtnValue({value:true,id:data._id});
    }
  
    const clearBtnClick = ()=>{
        setInput({name:'',address:'',contact:''});
        seteditBtnValue({value:false,id:''});
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
                dispatch(fetchClient())
                activeStatusUser()
            }

        }


    }, [])

    if (status === 'loading') {
        return (
            <Spinner />
        )
    }
    return (
        (!localStorage.getItem('token')) || active === false ? "" :
            <div className='container py-3'>
                <div className='row px-3'>
                    <div className='col-lg-4 p-5 my-5 card setbgImg bg-dark bg-opacity-75 '>

                        <h4 className='my-3 text-center text-lg-start text-danger' > CREATE NEW CLIENT </h4>
                        <div className='row'>
                            <div className='col-12'>
                                <form onSubmit={submit}>
                                    <div className="input-group mb-3  border border-white rounded-1 ">
                                        <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-plus-fill text-danger" viewBox="0 0 16 16">
                                            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                            <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                                        </svg></span>
                                        <input autoComplete='off' type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Client Name' onChange={onChange} value={input.name} id="name" name="name" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="input-group mb-3 border border-white rounded-1">
                                        <span className="bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-add-fill text-danger" viewBox="0 0 16 16">
                                            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 1 1-1 0v-1h-1a.5.5 0 1 1 0-1h1v-1a.5.5 0 0 1 1 0Z" />
                                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                            <path d="m8 3.293 4.712 4.712A4.5 4.5 0 0 0 8.758 15H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                                        </svg></span>
                                        <input autoComplete='off' type="text" className="setbgImg text-white border-0 form-control" placeholder='Enter Client Address' onChange={onChange} value={input.address} id="address" name="address" aria-describedby="emailHelp" />

                                    </div>
                                    <div className="input-group mb-3 border border-white rounded-1">
                                        <span className=" bg-opacity-25 input-group-text bg-dark border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-danger" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                        </svg></span>
                                        <input autoComplete='off' onKeyUp={keypress} type="text" inputMode='Numeric' className="setbgImg text-white  border-0 form-control" placeholder='Enter Client Contact' maxLength={10} minLength={10} onChange={onChange} value={input.contact} id="contact" name="contact" />
                                    </div>
                                    <div className="input-group mb-3 text-danger justify-content-center ">
                                        {error.error ? error.error : '' || error.errors ? error.errors[0].msg : ''}
                                    </div>
                                    <div className="d-flex gap-2 mt-2 justify-content-center">
                                       {editBtnValue.value?'': <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 "  disabled={!input.contact || !input.name || !input.address ? true : false} type="submit">Create</button>}
                                       {editBtnValue.value?<button className="btn text-white fw-bold  mb-4 btnlogIn border-0 "  disabled={!input.contact || !input.name || !input.address ? true : false} type="button" onClick={()=>dispatch(EditClient(input,editBtnValue.id))}>Update</button>:''}
                                        <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={!input.contact && !input.name && !input.address ? true : false} type="button" onClick={()=>clearBtnClick()}>Cancel</button>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-6 offset-lg-2'>
                        <div className='row mt-3'>
                            <div className='col-lg-5'>
                                <h4 className=' text-center text-lg-start text-danger' > ADDED CLIENT</h4>
                            </div>

                            <div className='col-lg-7'>

                                <input className="searchinputSet form-control me-2 setbgImg btnlogIn border-0 text-white border-danger " onKeyUp={filterClient} type="text" placeholder="Search" aria-label="Search" />
                            </div>

                        </div>


                        <hr className='mb-0' />
                        <div className='setClient px-1 px-lg-3 py-2'>
                            {client.length === 0 ? <h5 className='text-danger'>NOT FOUND</h5> :
                                client.map((clientdata) => {
                                    return (
                                        <Client clientdata={clientdata} key={clientdata._id} editClientBtn={editClientBtn} />
                                    )

                                })}
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default AddNewClient
