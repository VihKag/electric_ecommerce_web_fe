import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "", // Từ khóa tìm kiếm
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state) => {
      state.keyword = "";
    },
  },
});

export const { setKeyword, clearKeyword } = searchSlice.actions;

export default searchSlice.reducer;
