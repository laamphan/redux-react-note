import { RootStateValidator } from "@/lib/validators/root-state"
import { configureStore } from "@reduxjs/toolkit"
import listReducer, { ListState } from "../features/list/listSlice"
import noteReducer, { NoteState } from "../features/note/noteSlice"
import tagReducer, { TagState } from "../features/tag/tagSlice"

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) {
      return undefined
    }
    return RootStateValidator.parse(JSON.parse(serializedState)) as RootState
  } catch (err) {
    console.log(err)
  }
}

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch (err) {
    console.log(err)
  }
}

const preloadedState = loadState()

export const store = configureStore({
  reducer: {
    note: noteReducer,
    list: listReducer,
    tag: tagReducer,
  },
  preloadedState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = {
  note: NoteState
  list: ListState
  tag: TagState
}
export type AppDispatch = typeof store.dispatch
