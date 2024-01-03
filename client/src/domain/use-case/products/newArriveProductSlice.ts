import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "../cart/cartSlice"
import { baseRequest } from "@/infrastructure/axios/baseRequest"
import { getDayBetweenTwoDate } from "@/helpers/date";


type InitialStateType = {
  data: CartType[],
  loading: Boolean,
  error: string | undefined | null,
}

const initialState: InitialStateType = {
  data: [],
  loading: false,
  error: null,
};

export const fetchNewArriveProduct = createAsyncThunk('fetchNewArriveProductSlice/fetchNewArriveProduct', async () => {
  try {
    const response = await baseRequest.get(`/products?populate=*&`);
    const products = [...response?.data?.data]
    const sortByRecent = [...products].sort((a,b) => {
      return new Date(b.attributes?.createdAt) - new Date(a.attributes?.createdAt) 
    })
    const newArrivageProduct = products.filter(item => getDayBetweenTwoDate(item?.attributes?.publishedAt)).reverse()
    return newArrivageProduct.length > 2 ? newArrivageProduct : sortByRecent.slice(0, 4)
     
  } catch (error) {
    throw error;
  }
});

export const newArriveProductSlice = createSlice({
  name: 'newArriveProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewArriveProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArriveProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewArriveProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//   export default favorisSlice.reducer;