import { configureStore } from '@reduxjs/toolkit'
import productReducer from './reducers/product'

const store = configureStore({
  reducer: {
    product: productReducer,
  },
})

export default store;