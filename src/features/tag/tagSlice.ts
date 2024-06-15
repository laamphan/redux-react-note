import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface TagState {
  tags: string[]
}

const initialState: TagState = {
  tags: [
    "Family",
    "Friends",
    "HCM",
    "Ha Noi",
    "Ha Tinh",
    "France",
    "LAN",
    "Code",
  ],
}

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<string>) => {
      if (state.tags.indexOf(action.payload) !== -1) return
      state.tags.push(action.payload)
    },
    updateTag: (state, action: PayloadAction<string>) => {
      if (state.tags.indexOf(action.payload) !== -1) return
      let index = state.tags.findIndex((tag) => tag === action.payload)
      state.tags[index] = action.payload
    },
    deleteTag: (state, action: PayloadAction<string>) => {
      let index = state.tags.findIndex((tag) => tag === action.payload)
      if (index !== -1) state.tags.splice(index, 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTag, updateTag, deleteTag } = tagSlice.actions

export default tagSlice.reducer
