import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "../cart/cartSlice"
import { baseRequest } from "@/infrastructure/axios/baseRequest"


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

export const fetchfeatureProduct = createAsyncThunk('featureProductSlice/fetchfeatureProduct', async () => {
  try {
    const response = await baseRequest.get(`/commands?populate=*&`);
    const products = [...response?.data?.data]
    
    
    const moreSellProductids  : number[] = []
    let moreSellProduct : CartType[] = []

    const sortByRecent = [...products].sort((a,b) => {
      return new Date(b.attributes?.updatedAt) - new Date(a.attributes?.updatedAt) 
    })

    for(const item of sortByRecent ){
      if(!moreSellProductids.includes(item.attributes?.productId)){
        moreSellProductids.push(item.attributes?.productId)
      } 
    }

    for(const item of moreSellProductids ){
       const res = await baseRequest.get(`/products?populate=*&[filters][id]=${item}`);
       moreSellProduct = [...moreSellProduct, ...res?.data?.data]
    }

     return moreSellProduct.slice(0, 4).reverse()
     
  } catch (error) {
    throw error;
  }
});

export const featureProductSlice = createSlice({
  name: 'featureProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfeatureProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchfeatureProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchfeatureProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//   export default favorisSlice.reducer;