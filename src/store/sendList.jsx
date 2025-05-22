import { createSlice } from "@reduxjs/toolkit"

const intialState = { items: [], totalPoint: 0, change: false }

const sendListSlice = createSlice({
  name: "sendList",
  initialState: intialState,
  reducers: {
    replaceList(state, action) {
      state.totalPoint = action.payload.totalPoint
      state.items = action.payload.items
    },
    addItems(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find((item) => item.id === newItem.id)
      if (!existingItem) {
        state.totalPoint += newItem.point
        state.changed = true
        state.items.push({
          id: newItem.id,
          point: newItem.point,
          number: newItem.number,
          level: newItem.level,
        })
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload
      const existingItem = state.items.find((item) => item.id === id)
      if (existingItem) {
        state.totalPoint -= existingItem.point
        state.changed = true
        state.items = state.items.filter((item) => item.id !== id)
      }
    },
  },
})

export const sendListActions = sendListSlice.actions

export default sendListSlice.reducer
