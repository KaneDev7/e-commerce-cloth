import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "./cartSlice"
import { baseRequest } from "@/services/axios/baseRequest"



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

export const fetchRececntlyViews = createAsyncThunk('rececntlyViews/fetchRececntlyViews', async (userId: string) => {
  try {
    const response = await baseRequest.get(`/products?populate=*&`);

    const getRececntlyViewsProduct = response?.data?.data?.filter(item => {
      return item?.attributes?.recentlyViewed
    });


    const getRececntlyViewsOfCurrentUser = [...getRececntlyViewsProduct].filter(item => {
      return item?.attributes?.recentlyViewed?.split(',').includes(`[{"userId":${userId}`) ||
             item?.attributes?.recentlyViewed?.split(',').includes(`{"userId":${userId}`)
    })

      const sortRececntlyViewsProduct = [...getRececntlyViewsOfCurrentUser].sort((a, b) => {
        return(
          JSON.parse(b?.attributes?.recentlyViewed)
          .filter(item => item.userId === userId)[0].date - 

          JSON.parse(a?.attributes?.recentlyViewed)
          .filter(item => item.userId === userId)[0].date
        )
      })

     return sortRececntlyViewsProduct.slice(0, 4)
  } catch (error) {
    // Gérer les erreurs ici
    throw error;
  }
});

export const rececntlyViewsSlice = createSlice({
  name: 'favoris',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRececntlyViews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRececntlyViews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRececntlyViews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//   export default favorisSlice.reducer;