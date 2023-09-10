import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface tokenState {
    token: null | string;
}

const getInitialState = () => {
    const token = localStorage.getItem("token");
    return token;
};

// Define the initial state using that type
const initialState: tokenState = { token: getInitialState() };

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<tokenState>) => {
            if (action.payload.token) {
                localStorage.setItem("token", action.payload.token);
                state.token = action.payload.token;
            }
        },
        removeToken: (state) => {
            localStorage.removeItem("token");
            state.token = null;
        },
    },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
