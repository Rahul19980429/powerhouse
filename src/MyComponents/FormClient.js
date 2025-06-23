
import React, { useState} from 'react'
import { InsertNewClient, setError } from '../redux/slices/ClientSlice';
import { useDispatch, useSelector } from 'react-redux';

const FormClient = () => {
    
    const dispatch = useDispatch();
    const {  error } = useSelector((state) => state.client)

    const [input, setInput] = useState({ name: '', address: '', contact: '' });
     const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError('')

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

    return (

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
                    <div className="input-group mb-3 text-danger ">
                        {error.error ? error.error:'' || error.errors?error.errors[0].msg:'' }
                    </div>
                    <div className="d-grid gap-2 mt-2">
                        <button className="btn text-white fw-bold  mb-4 btnlogIn border-0 " disabled={!input.contact || !input.name || !input.address ? true : false} type="submit">Create</button>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default FormClient
