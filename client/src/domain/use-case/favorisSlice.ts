import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "./cart/cartSlice"
import { baseRequest } from "@/infrastructure/axios/baseRequest"


type InitialStateType = {
  data: CartType[] ,
  loading: Boolean,
  error: string | undefined | null,
}

const initialState  : InitialStateType= {
  data: [],
  loading: false,
  error: null,
};

export const fetchFavoris = createAsyncThunk('favoris/fetchFavoris', async (userId: string) => {
    try {
      const response = await baseRequest.get(`/products?populate=*&`);
      const favorisProducts = response?.data?.data?.filter(item => {
        return JSON.parse(item?.attributes?.like)?.includes(userId);
      });
      return favorisProducts.reverse();
    } catch (error) {
      // Gérer les erreurs ici
      throw error;
    }
  });
  
  export const favorisSlice = createSlice({
    name: 'favoris',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchFavoris.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavoris.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFavoris.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    },
  });
  
//   export default favorisSlice.reducer;