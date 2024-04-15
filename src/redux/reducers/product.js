import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const prodcutSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state,action) => {
      state.products = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProduct} = prodcutSlice.actions

export default prodcutSlice.reducer