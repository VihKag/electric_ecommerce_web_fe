import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/apiService";
const persistedUser = JSON.parse(sessionStorage.getItem('user')) || null;
const initialState = {
  isAuth: false,
  user: persistedUser,
  role:null,
  token: null,
  status: null,
};

//use async thunk to handle login
export const LoginAsync = createAsyncThunk(
  "admin/authLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.adminLogin(credentials);
      console.log(response.data);
      const { username, email, images, access_token, id, role } = response.data.data;
      console.log(username, email, images);
      const status = response.status; // Lấy mã trạng thái HTTP
      const user = { username: username, email, image: images, id: id , role: role};
      localStorage.setItem("tk", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
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
        status: error.response.status, // Lấy mã trạng thái lỗi
      });
    }
  }
);


export const  JwtAsync = createAsyncThunk(
  "admin/authJwt",
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.authToken(token);
      console.log(response.data);
      const { username, email, images, access_token, id, role } = response.data.data;
      console.log(username, email, images);
      const status = response.status; // Lấy mã trạng thái HTTP
      const user = { username: username, email, image: images, id: id , role: role};
      localStorage.setItem("tk", access_token);
      sessionStorage.setItem("user", JSON.stringify(user));
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
  name: "auth/admin",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      state.status = null;
      localStorage.removeItem("tk");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = action.payload.status;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(LoginAsync.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      })
      // Add case for authJwtAsync
      .addCase(JwtAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(JwtAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.status = action.payload.status;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
      })
      .addCase(JwtAsync.rejected, (state, action) => {
        state.status = action.payload.status;
        state.error = action.payload.message;
      });
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
