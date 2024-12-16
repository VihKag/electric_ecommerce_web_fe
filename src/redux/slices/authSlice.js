import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/apiService";
const persistedUser = JSON.parse(localStorage.getItem('user')) || null;
const initialState = {
  isAuth: false,
  user: persistedUser,
  token: null,
  status: null,
};

//use async thunk to handle login
export const clientLoginAsync = createAsyncThunk(
  "auth/clientLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.clientLogin(credentials);
      // Check if response.data and response.data.data exist
      if (!response.data || !response.data.data) {
        throw new Error("Invalid response structure");
      }

      const { username, email, images, access_token, _id, bonuspoint } = response.data.data;

      const status = response.status; // HTTP status code
      const user = { username, email, image: images, id: _id, bonuspoint };
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("access_token: ", access_token);
      console.log("user: ", user);
      return {
        user,
        access_token,
        status, // Lấy mã trạng thái HTTP
      };
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message || "An error occurred";
      const status = error.response?.status || 500; // Default to 500 if status is unavailable
      return rejectWithValue({ message, status });
    }
  }
);

export const  authJwtAsync = createAsyncThunk(
  "auth/authJwt",
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.authToken(token);
      console.log(response.data);
      const { username, email, images, access_token, _id, bonuspoint } = response.data.data;
      console.log(username, email, images);
      const status = response.status; // Lấy mã trạng thái HTTP
      const user = { username: username, email, image: images, id: _id , bonuspoint: bonuspoint};
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("access_token: ", access_token);
      console.log("user: ", user);
      return {
        user,
        access_token,
        status, // Lấy mã trạng thái HTTP
      };
    } catch (error) {
      return rejectWithValue({
        message: error.response.data.message,
        status: error.response.status, // Lấy mã trạng thái l��i
      });
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      state.status = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clientLoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(clientLoginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = action.payload.status;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(clientLoginAsync.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      // Add case for authJwtAsync
      .addCase(authJwtAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authJwtAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = action.payload.status;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(authJwtAsync.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
