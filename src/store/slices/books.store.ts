/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooksSliceType {
   loading: boolean;
   error: boolean;
   list: any;
   current: any;
}

const initialState: BooksSliceType = {
   loading: false,
   error: null,
   list: null,
   current: null,
};

export const booksStore = createSlice({
   name: 'books',
   initialState,
   reducers: {
      getBooks: (state) => {
         state.loading = true;
      },
      getBooksSuccess: (state, action: PayloadAction<any[]>) => {
         state.loading = false;
         state.list = action.payload;
      },
      getBooksError: (state) => {
         state.error = true;
         state.loading = false;
      },
      setCurrentBook: (state, action: PayloadAction<any>) => {
         state.loading = false;
         state.error = null;
         state.current = action.payload;
      },
      getCurrentBookError: (state) => {
         state.loading = false;
         state.error = true;
         state.current = null;
      },
   },
});

// Action creators are generated for each case reducer function
export const { getBooks, getBooksSuccess, getBooksError, setCurrentBook, getCurrentBookError } = booksStore.actions;
