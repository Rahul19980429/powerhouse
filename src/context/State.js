import GymContext from "./Context";
import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { fetchClientWithPlan } from '../redux/slices/ClientWithGymPlanSlice'

const host = 'http://localhost:3001'

const State = (props) => {
  const dispatch = useDispatch();

  // usestate for errors
  const [error, setError] = useState('')

  const [editAccess, seteditAccess] = useState(false)

  // date formate function
  const setDatefunc = (date) => {
    let dateformate = new Date(date)
    return (dateformate.getDate() < 10 ? '0' + dateformate.getDate() : dateformate.getDate()) + '/' + ((dateformate.getMonth() + 1) < 10 ? '0' + (dateformate.getMonth() + 1) : (dateformate.getMonth() + 1)) + "/" + dateformate.getFullYear()
  }

  // add a client with gym plan
  const addClientWithSub = async (client_id, plan_id) => {
    const response = await fetch(`${host}/api/clientwithplan/new`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ client_id, plan_id })
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch(fetchClientWithPlan())
      let msg = `Welcome to the ${JSON.parse(localStorage.getItem('user')).firmname}. Hey ${data.clientData.name} you select ${data.planData.plan} month (${data.planData.plandesc}) plan (${setDatefunc(data.insert.date)} to ${setDatefunc(data.insert.uptodate)}). Thank you have a nice day.`
      whatsAppApi(data.clientData.contact, msg)

    }
    else {
      alert(data.error)
    }

  }


  // update client's active status in gym plan
  const updateActiveClient = async (subId) => {
    const response = await fetch(`${host}/api/clientwithplan/update/${subId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        }
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch(fetchClientWithPlan())
    }
    else {
      alert(data.error)
    }

  }




  // api for create user only by superAdmin
  const [user, setUser] = useState([])
  const createNewUser = async (name, firmname, apikey, contact, password) => {
    const response = await fetch(`${host}/api/auth/createNewUser`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, firmname, apikey, contact, password })
      }
    );
    const data = await response.json();
    if (data.success) {
      getAllUsers()
    }
    else {
      setError(data)
    }
  };
  // edit user active status 
  const editActiveStatus = async (id, active) => {
    const response = await fetch(`${host}/api/auth/edituser/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ active })
      }
    );
    const data = await response.json();
    if (data.success) {
      getAllUsers()
    }

  };



  // api for get all user of fitness only superadmin can access
  const getAllUsers = async () => {
    const response = await fetch(`${host}/api/auth/getallusers`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      setUser(data.user.reverse())
    }
  }










  const whatsAppApi = async (clientNumber, message) => {
    let apikey = JSON.parse(localStorage.getItem('user')).apikey;
    if (apikey !== '' && clientNumber.length === 10) {
      await fetch(`https://api.bulkcampaigns.com/api/wapi/?apikey=${apikey}&mobile=${clientNumber}&msg=${message}`)

    }
    else {
      alert('Message Not Send');
    }

  }

  // Login api for user 
  const logInUser = async (contact, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, password })
    });
    let data = await response.json();
    return data;

  }


  // verification
  // Login api for user 
  const verifyUser = async (password) => {
    const response = await fetch(`${host}/api/auth/verifyUser`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ password })
    });
    let data = await response.json();
    return data;

  }

  // logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')

  }

  const activeStatusUser = async () => {
    const response = await fetch(`${host}/api/auth/activeStatus`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    let data = await response.json();

    if (data.success) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

  }


  // edit user api =>name||firmname||contact||password||apikey

  const editUserData = async (id, userData) => {
    const { name, firmname, contact, apikey, password } = userData
    const response = await fetch(`${host}/api/auth/edituser/${id}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ name, firmname, contact, apikey, password })
      }
    );
    const data = await response.json();
    if (data.success) {
      setError({ error: 'Updated Successfully' })
      localStorage.setItem('user', JSON.stringify(data.done))
    }
    else {
      setError(data)
    }

  };
  return (
    <div>
      <GymContext.Provider value={{
        user, error,
        editActiveStatus, setError,
        getAllUsers, createNewUser,
        addClientWithSub,
        updateActiveClient, whatsAppApi, setDatefunc, handleLogout
        , activeStatusUser, logInUser,
        editUserData,
        verifyUser,
        editAccess, seteditAccess
      }}>
        {props.children}
      </GymContext.Provider>
    </div>
  );
};

export default State;

