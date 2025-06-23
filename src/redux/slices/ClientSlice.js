import { createSlice } from "@reduxjs/toolkit";
const host = 'http://localhost:3001';
const STATUS = Object.freeze({
    IDEL: 'idel',
    LOADING: 'loading',
    ERROR: 'error'

})

const ClientSlice = createSlice({
    name: 'client',
    initialState: {
        data: [],
        status: STATUS.IDEl,
        error:[]
    },
    reducers: {
        setClient(state, action) {
            state.data = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setFilterClientData(state, action) {
            state.data = action.payload
        },
        setNewClient(state,action) {
            state.data.push(action.payload)
        },
        setDataAfterDeleteClient(state,action) {
            
         let newState = state.data.filter((client)=>{return client._id !== action.payload})
         state.data= newState;
        },
        setError(state,action) {
            state.error = action.payload
        },
        setEditedClient(state,action) {
        state.data = state.data.map((ele)=>(
            ele._id === action.payload._id ? action.payload: ele 
        ))
        }

    }

})

export const { setClient, setStatus, setFilterClientData,setNewClient,setDataAfterDeleteClient,setError,setEditedClient} = ClientSlice.actions
export default ClientSlice.reducer;

export function fetchClient() {
    return async function fetchClientThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/fitness/allClient`,
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
            dispatch(setClient(data.user))
            dispatch(setStatus(STATUS.IDEL))
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export function InsertNewClient(clientData) {
    const { name, address, contact } = clientData;
    return async function InsertNewClientThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/fitness/createNew`,
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ name, address, contact })
                }
            );
            const data = await response.json();
            if(data.success){
                dispatch(setNewClient(data.insert))
                dispatch(setStatus(STATUS.IDEL))
            }
            else{
                dispatch(setError(data))
                dispatch(setStatus(STATUS.IDEL))
            }
           
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export function DeleteClient(clientId) {
    
    return async function DeleteClientThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/fitness/deleteClient/${clientId}`,{
                method: "DELETE",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  "auth-token":localStorage.getItem('token'),
                    
                },
              }
            );
            const data = await response.json();
            if(data.success){
            dispatch(setDataAfterDeleteClient(clientId))
            dispatch(setStatus(STATUS.IDEL))
            }
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export function EditClient(clientData,id) {
    const { name, address, contact } = clientData;
    return async function EditClientThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/fitness/editClient/${id}`,
                {
                    method: "PUT",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ name, address, contact })
                }
            );
            const data = await response.json();
            if(data.success){
                dispatch(setEditedClient(data.done))
                dispatch(setStatus(STATUS.IDEL))
            }
            else{
                dispatch(setError(data))
                dispatch(setStatus(STATUS.IDEL))
            }
           
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}