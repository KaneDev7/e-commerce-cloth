import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CartType } from "../cart/cartSlice"
import { baseRequest } from "@/infrastructure/axios/baseRequest"
import { CommandService } from "@/infrastructure/services/commandService";


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

const sortByQuantityofNumberOfCommandFn = (products) =>{
  return [...products].sort((a,b) => {
    return (b.attributes?.numberOfCommand * Number(b.attributes?.quantity)) -
    (a.attributes?.numberOfCommand * Number(b.attributes?.quantity) )
  })
}

const sortByRecentFn = (products) =>{
  return [...products].sort((a,b) => {
    return new Date(b.attributes?.createdAt) - new Date(a.attributes?.createdAt) 
  })
}

const getMoreSellProduct = async (moreSellProductids) =>{
  let moreSellProduct : CartType[] = []
  for(const item of moreSellProductids ){
    const res = await baseRequest.get(`/products?populate=*&[filters][id]=${item}`);
    moreSellProduct = [...moreSellProduct, ...res?.data?.data]
 }
 return moreSellProduct
}



export const fetchfeatureProduct = createAsyncThunk('featureProductSlice/fetchfeatureProduct', async () => {
  try {
    const products = await new CommandService().getCommands()
    const moreSellProductids  : number[] = []
    const sortByRecent = sortByRecentFn(products)  
    const sortByQuantityofNumberOfCommand = sortByQuantityofNumberOfCommandFn(sortByRecent) 

    for(const item of sortByQuantityofNumberOfCommand){
      if(!moreSellProductids.includes(item.attributes?.productId)){
        moreSellProductids.push(item.attributes?.productId)
      } 
    }
     return getMoreSellProduct(moreSellProductids)
     
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
