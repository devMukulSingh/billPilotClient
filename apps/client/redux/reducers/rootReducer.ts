import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TApiResponse } from "lib/types/apiResponse.types";
import { TBill, TDistributor, TDomain, TProduct } from "lib/types/db.types";
import { TInitialState } from "redux/types/types";

const initialState:TInitialState = {
    bills : {
        count:0,
        data:[]
    },
    products : {
        count:0,
        data:[]
    },
    domains: {
        count: 0,
        data: []
    },
    distributors: {
        count: 0,
        data: []
    }
}

export const slice = createSlice({
    name:'rootSlice',
    initialState,
    reducers : {
        setBills : (state,action:PayloadAction<TApiResponse<TBill>>) => {
            state.bills = action.payload;
        },
        setProducts : (state,action:PayloadAction<TApiResponse<TProduct>>) =>{
            state.products = action.payload;
        }  ,
        setDomains: (state, action: PayloadAction<TApiResponse<TDomain>>) => {
            state.domains = action.payload;
        }  ,
        setDistributors: (state, action: PayloadAction<TApiResponse<TDistributor>>) => {
            state.distributors = action.payload;
        },
    }
})

export default slice.reducer;
export const {setBills,setProducts,setDistributors,setDomains} = slice.actions

