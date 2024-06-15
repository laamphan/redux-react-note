import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface ListState {
  lists: string[]
}

const initialState: ListState = {
  lists: [
    "Personal",
    "Work",
    "List 3",
    "List 4",
    "List 5",
    "List 6",
    "List 7 ",
  ],
}

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      if (state.lists.indexOf(action.payload) !== -1) return
      state.lists.push(action.payload)
    },
    updateList: (state, action: PayloadAction<string>) => {
      let index = state.lists.findIndex((list) => list === action.payload)
      if (index !== -1) state.lists[index] = action.payload
    },
    deleteList: (state, action: PayloadAction<string>) => {
      let index = state.lists.findIndex((list) => list === action.payload)
      if (index !== -1) state.lists.splice(index, 1)
    },
  },
})

export const { addList, updateList, deleteList } = listSlice.actions

export default listSlice.reducer
