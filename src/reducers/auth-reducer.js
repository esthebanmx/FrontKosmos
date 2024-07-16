import { createSlice } from "@reduxjs/toolkit";

const initialState = {authenticated: false};

const userReducer = createSlice({
	name: "authentication",
	// initialState: {
	// 	authenticated: false,
	// },
	initialState,
	reducers: {
		auth: (state) => {
			state.authenticated = true;
		},
		no_auth: (state) => {
			state.authenticated = false;
		},
	}
});

export const authenticatedState = (state) => state.authenticated;

export const { auth, no_auth } = userReducer.actions;
export default userReducer.reducer;
