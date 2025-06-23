import { createSlice } from "@reduxjs/toolkit";
const host = 'https://gymfactory-backend.vercel.app'
const STATUS = Object.freeze({
    IDEL: 'idel',
    LOADING: 'loading',
    ERROR: 'error'

})

const ClientWithGymPlanSlice = createSlice({
    name: 'clientwithplan',
    initialState: {
        data: [],
        status: STATUS.IDEl
    },
    reducers: {
        setClientWithPlan(state, action) {
            state.data = action.payload

        },
        setStatus(state, action) {
            state.status = action.payload
        },
        setFilterData(state, action) {
            state.data = action.payload
        },
        setDeleteClientWithPlan(state,action) {
         let newState = state.data.filter((client)=>{return client.main._id !== action.payload})
         state.data= newState;
        }
    }

})

export const { setClientWithPlan, setStatus, setFilterData,setDeleteClientWithPlan } = ClientWithGymPlanSlice.actions
export default ClientWithGymPlanSlice.reducer;

export function fetchClientWithPlan() {
    return async function fetchClientWithPlanThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/clientwithplan/all`,
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
            dispatch(setClientWithPlan(data.completeData))
            dispatch(setStatus(STATUS.IDEL))
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}

export function DeleteClientWithPlan(clientId) {
   
    return async function DeleteClientWithPlanThunk(dispatch, getState) {
        dispatch(setStatus(STATUS.LOADING))
        try {
            const response = await fetch(`${host}/api/clientwithplan/delete/${clientId}`,{
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
            dispatch(setDeleteClientWithPlan(clientId))
            dispatch(setStatus(STATUS.IDEL))
            }
        } catch (error) {
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}
