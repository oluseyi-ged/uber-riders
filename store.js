import { configureStore } from "@redexjs/toolkit"
import navReducer from "./slices/navSlice"

export const store = configureStore({
  reducer: {
    nav: navReducer,
  },
})
