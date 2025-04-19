import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TBill } from "types/api/bills";
import { TApiResponse } from "types/apiResponse.types";

export type TInitialState = {
    bills: TApiResponse<TBill[]>,

}
const initialState: TInitialState = {
    bills: {
        count: 0,
        data: []
    },
}

export const slice = createSlice({
    name: 'rootSlice',
    initialState,
    reducers: {
        setBills: (state, action: PayloadAction<TApiResponse<TBill[]>>) => {
            state.bills = action.payload;
        },
    }
})

export default slice.reducer;
export const { setBills } = slice.actions

