import React, { useState, useContext } from 'react';
import context from '../context/Context';
import { useNavigate } from 'react-router-dom';
const Form = () => {
    const navigate = useNavigate();
    let result;
    const a = useContext(context);
    const { logInUser, error, setError } = a;
    const [inputs, setInputs] = useState({ contact: "", password: "" })

    const [password, setPassword] = useState({
        eye: "bi-eye-slash-fill",
        path1: "m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z",
        path2: "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z",
        Itype: "password"
    })

    const handleEye = () => {
        if (password.eye === "bi-eye-slash-fill" && password.Itype === "password") {
            setPassword({
                eye: "bi-eye-fill",
                path1: "M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z",
                path2: "M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z",

                Itype: "text"
            })
        }
        else {
            setPassword({
                eye: "bi-eye-slash-fill",
                path1: "m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z",
                path2: "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z",
                Itype: "password"
            })
        }
    }
    // handle inputs 

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setError('')
    }
    const keypress = (e) => {
        if (isNaN(e.target.value)) {
            e.target.value = "";
        }
    }

    // for login or submit
    const submit = async (e) => {
        e.preventDefault();
        result = await logInUser(inputs.contact, inputs.password);
        if (result.success) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('user', JSON.stringify(result.user))
            navigate('/')
        }
        else {
            setError(result)
            navigate('/login')

        }

    }
    return (
        <form onSubmit={submit}>
            <h1 className='text-center  mb-5 text-danger'>Log In here</h1>
            <div className="input-group mb-3 border border-white rounded-1">
                <span className="input-group-text  setbgImg border-0 rounded-0" id="basic-addon1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill text-danger" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                </svg></span>
                <input type="text" onKeyUp={keypress} autoComplete='off' maxLength='10' minLength='10' className="setbgImg border-0 form-control border text-white" onChange={onChange} placeholder="Enter Contact Number" name="contact" value={inputs.contact} />
            </div>

            <div className="input-group mb-3 border border-white rounded-1">
                <span onClick={() => handleEye()} style={{ cursor: 'pointer' }} className="input-group-text setbgImg border-0 rounded-0 text-white" id="basic-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className={`bi ${password.eye} text-danger`} viewBox="0 0 16 16">
                    <path d={password.path1} />
                    <path d={password.path2} />
                </svg></span>
                <input type={password.Itype} autoComplete='off' className="setbgImg form-control border-0 text-white " onChange={onChange} placeholder="Enter Password" name="password" value={inputs.password} />
            </div>
            <div className="input-group mb-3 text-danger justify-content-center ">
                {error.error?error.error:'' || error.errors?error.errors[0].msg:''}
            </div>


            <div className="d-grid  gap-2 mt-2">
                <button className='btn text-white border-0 mb-4 btnlogIn' disabled={!inputs.password ? true : false} type="submit">LOG IN</button>
            </div>

          </form>
    )
}

export default Form
