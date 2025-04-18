import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    bills: []
};

const billSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        
    },
});

export const billActions = billSlice.actions;
export default billSlice.reducer;
