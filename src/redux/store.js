import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Make sure the path is correct
import cartReducer from './slices/cartSlice'; 
import searchReducer from './slices/searchSlice';
import adminReducer from './slices/adminSlice';
const store = configureStore({
  reducer: {
    auth: authReducer, // Use 'auth' as the key
    cart: cartReducer, //
    search: searchReducer,
    admin: adminReducer,
  },
});

export default store;
