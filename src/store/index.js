import { configureStore } from "@reduxjs/toolkit"
import sendListReducer from "./sendList"
import uiReducer from "./ui"

const store = configureStore({
  reducer: {
    sendList: sendListReducer,
    ui: uiReducer,
  },
})

export default store
