/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSliceType {
   admin: boolean;
   loading: boolean;
   error: boolean;
   name: any;
   darkTheme: boolean;
}

const initialState: AuthSliceType = {
   admin: null,
   loading: false,
   error: null,
   name: null,
   darkTheme: false,
};

export const authStore = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      AuthValidation: (state) => {
         state.loading = true;
      },
      AuthValidationFail: (state) => {
         state.loading = false;
         state.error = true;
      },
      AuthValidationSuccess: (state, action: PayloadAction) => {
         state.loading = false;
         state.error = false;
         state.admin = true;
         state.name = action.payload;
      },
      AuthReset: (state) => {
         state.loading = false;
         state.error = null;
         state.admin = null;
         state.name = null;
      },
      setDarkTheme: (state) => {
         state.darkTheme = !state.darkTheme;
      },
   },
});

// Action creators are generated for each case reducer function
export const { AuthValidation, AuthValidationFail, AuthValidationSuccess, AuthReset, setDarkTheme } = authStore.actions;
