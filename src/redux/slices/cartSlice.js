import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cardService } from '../../services/apiService';

// Các action async
export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
  try {
    const response = await cardService.getCategoryByUserId(userId);
    console.log("cart slice: ",response.data);
    return response.data.data;  // Lấy dữ liệu giỏ hàng
    
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

// Khởi tạo state ban đầu
const initialState = {
  productItem: [],  // Sản phẩm trong giỏ hàng
  total: 0,  // Tổng giá trị giỏ hàng
  loading: false,  // Trạng thái loading
  error: null,  // Lỗi nếu có
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Clear cart (giải phóng giỏ hàng)
    clearCart(state) {
      state.productItem = [];
      state.total = 0;
    },
    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const product = state.productItem.find(item => item._id === productId);
      if (product) {
        product.quantity = quantity;
      }
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    // Thêm sản phẩm vào giỏ hàng
    addProductToCart(state, action) {
      state.productItem.push(action.payload);
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },
    // Xóa sản phẩm khỏi giỏ hàng
    removeProductFromCart(state, action) {
      state.productItem = state.productItem.filter(item => item._id !== action.payload);
      // Tính lại tổng giá trị giỏ hàng
      state.total = state.productItem.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
        state.error = action.payload || 'Lỗi tải giỏ hàng';
      });
  },
});

export const { clearCart, updateQuantity, addProductToCart, removeProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
