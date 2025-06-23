import { configureStore } from "@reduxjs/toolkit";
import ClientReducer from "./slices/ClientSlice"
import ClientWithGymPlanReducer from "./slices/ClientWithGymPlanSlice";
import GymPlanReducer from "./slices/GymPlanSlice"
 const Store = configureStore({
    reducer:{
    client:ClientReducer,
    clientwithplan:ClientWithGymPlanReducer,
    gymplan:GymPlanReducer
    }
})

export default Store