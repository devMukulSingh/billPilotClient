import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TApiResponse } from "lib/types/apiResponse.types";
import { TBill } from "lib/types/db.types";
import { TInitialState } from "redux/types/types";

const initialState:TInitialState = {
    bills : {
        count:0,
        data:[]
    }
}

export const slice = createSlice({
    name:'rootSlice',
    initialState,
    reducers : {
        setBills : (state,action:PayloadAction<TApiResponse<TBill>>) => {
            state.bills = action.payload;
        }   
    }
})

export default slice.reducer;
export const {setBills} = slice.actions

