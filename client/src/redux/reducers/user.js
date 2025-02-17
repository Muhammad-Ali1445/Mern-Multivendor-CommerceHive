import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isAuthenticatedUser:false,
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadUserRequest', (state) => {
            state.loading = true;
        })
        .addCase('LoadUerSuccess', (state, action) => {
            state.loading = false;
            state.isAuthenticatedUser = true;
            state.user = action.payload;
        })
        .addCase('LoadUserFailure', (state, action) => {
            state.loading = false;
            state.isAuthenticatedUser = false;
            state.error = action.payload;
        });
});