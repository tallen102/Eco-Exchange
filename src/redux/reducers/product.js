import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  allProducts: []
}

export const prodcutSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload
    },
    setAllProduct: (state, action) => {
      state.allProducts = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProduct, setAllProduct } = prodcutSlice.actions

export default prodcutSlice.reducer