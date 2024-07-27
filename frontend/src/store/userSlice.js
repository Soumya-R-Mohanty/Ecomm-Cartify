import {createSlice} from "@reduxjs/toolkit"

const initialState={
    user:null
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserdetails:(state,action)=>{
            state.user=action.payload
            
        }
    },
})
export const {setUserdetails}=userSlice.actions

export default userSlice.reducer
