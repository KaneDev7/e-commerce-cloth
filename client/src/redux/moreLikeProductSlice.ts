import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "./cartSlice"
import { baseRequest } from "@/axios/baseRequest"


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

export const fetchMoreLikeProduct = createAsyncThunk('featureProductSlice/moreLikeProduct', async () => {
  try {
    const response = await baseRequest.get(`/products?populate=*&`);

    const getLikeProducts = response?.data?.data?.filter(item => {
      return item?.attributes?.like
    });


      const sortLikeProducts = [...getLikeProducts].sort((a, b) => {
        return(JSON.parse(b?.attributes?.like).length -  JSON.parse(a?.attributes?.like).length)
      })


     return sortLikeProducts.slice(0, 5)
  } catch (error) {
    // Gérer les erreurs ici
    throw error;
  }
});

export const moreLikeProductSlice = createSlice({
  name: 'moreLikeProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreLikeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreLikeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMoreLikeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//   export default favorisSlice.reducer;