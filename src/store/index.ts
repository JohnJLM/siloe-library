import { configureStore } from '@reduxjs/toolkit';
import { booksStore } from './slices/books.store';
import { authStore } from './slices/auth.store';

export const store = configureStore({
   reducer: {
      auth: authStore.reducer,
      books: booksStore.reducer,
   },
});

// const rootReducer = (state, action) => {
//     if (action.type === AuthActions.AUTH_RESET || action.type === AuthActions.AUTH_LOGOUT) {
//         return reducers(undefined, action);
//     }

//     return reducers(state, action);
// };

// export const store = createStore(reducers, composeWithDevTools());
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
