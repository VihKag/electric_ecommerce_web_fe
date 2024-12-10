import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../../services/apiService";

// Các action async
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await cartService.getCartByUserId(userId);
      console.log("cart slice: ", response.data);
      return response.data.data; // Lấy dữ liệu giỏ hàng
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await cartService.updateCart(cartData); // Gọi API PUT
      return response.data.cart; // Trả về giỏ hàng cập nhật
    } catch (error) {
      return rejectWithValue(error.response.data.message); // Trả về lỗi
    }
  }
);

// Khởi tạo state ban đầu
const initialState = {
  productItem: [], // Sản phẩm trong giỏ hàng
  checkoutItem: [], // Sản phẩm dang checkout
  total: 0, // Tổng giá trị giỏ hàng
  loading: false, // Trạng thái loading
  error: null, // Lỗi nếu có
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Clear cart (giải phóng giỏ hàng)
    clearCart(state) {
      state.productItem = [];
      state.total = 0;
    },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const products = state.productItem.find((item) => item._id === _id);
      if (products) {
        products.quantity = quantity;
      }
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(state, action) {
      state.productItem.push(action.payload);
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeProductFromCart(state, action) {
      state.productItem = state.productItem.filter(
        (item) => item._id !== action.payload
      );
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    addToCheckout(state, action) {
      const product = action.payload;
      // Khởi tạo lại checkoutItem là mảng rỗng và thêm sản phẩm mới
      state.checkoutItem = [product];
    },
    // Thêm action resetCart để đặt lại giỏ hàng
    resetCart(state) {
      state.productItem = [];
      state.checkoutItem = [];
      state.total = 0;
      state.error = null; // Reset lỗi nếu có
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCart action
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.productItem = action.payload.productItem;
        state.total = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.productItem = [];
        state.error = action.payload || "Lỗi tải giỏ hàng";
      })
      // Handle updateCart action
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.productItem = action.payload.productItem; // Cập nhật danh sách sản phẩm
        state.total = action.payload.total; // Cập nhật tổng giá trị
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi cập nhật giỏ hàng";
      });
  },
});

export const {
  clearCart,
  updateQuantity,
  addProductToCart,
  removeProductFromCart,
  addToCheckout,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
