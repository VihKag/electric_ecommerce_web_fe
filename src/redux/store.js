import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Make sure the path is correct
import cartReducer from './slices/cartSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer, // Use 'auth' as the key
    cart: cartReducer, //
  },
});

export default store;
