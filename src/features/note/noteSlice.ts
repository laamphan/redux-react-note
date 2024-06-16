import { notesDueThisMonth, notesDueThisWeek, notesDueToday } from "@/lib/utils"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"

export interface SubtaskType {
  name: string
  checked: boolean
}

export interface NoteType {
  id: string
  title: string
  content: string
  dueDate?: string
  list: string
  tags: string[]
  subtasks: SubtaskType[]
  checked: boolean
}

export interface NoteState {
  notes: NoteType[]
  toRender: NoteType[]
  view: { type: "custom" | "list" | "tag" | "all"; value: string }
}

const initialState: NoteState = {
  notes: [
    {
      id: "ccc1c1a0-f989-4302-8b5a-a8ecdb9642ec",
      title: "Research content ideas",
      content: "For tiktokshop @ LAN",
      list: "",
      tags: [],
      subtasks: [],
      checked: false,
    },
    {
      id: "789ea265-fbb5-45df-b54a-3159bb213fb9",
      title: "Create a database of guest authors",
      content: "Using what tech?",
      list: "",
      tags: [],
      subtasks: [],
      checked: false,
    },
    {
      id: "dfc5df45-ffe3-4ac9-ad33-1ecfb1bcb443",
      title: "Renew driver's license",
      content: "@ Hometown",
      dueDate: "Sat Jun 29 2024 00:00:00 GMT+0700 (Indochina Time)",
      list: "Personal",
      tags: ["HCM"],
      subtasks: [
        {
          name: "Subtask",
          checked: false,
        },
      ],
      checked: false,
    },
    {
      id: "714e928e-f849-4933-9955-8a00fe1664de",
      title: "Consult accountant",
      content: "with files from Q4",
      list: "List 3",
      tags: [],
      subtasks: [
        {
          name: "Reschedule the meeting on Tuesday",
          checked: true,
        },
        {
          name: "Make appointment",
          checked: true,
        },
        {
          name: "Print files",
          checked: false,
        },
      ],
      checked: false,
    },
    {
      id: "afe1a5e0-227d-42a5-8f61-47c3c1ef189d",
      title: "Print business card",
      content: "For LAN",
      list: "Work",
      tags: [],
      subtasks: [],
      checked: false,
    },
    {
      id: "4ac617fe-c128-49f2-a83b-6ca64f4817c9",
      title: "Get new furnitures for bedroom",
      content: "@ IKEA",
      dueDate: "Tue Jun 18 2024 00:00:00 GMT+0700 (Indochina Time)",
      list: "Personal",
      tags: ["France"],
      subtasks: [],
      checked: false,
    },
    {
      id: "05d46dfd-1281-416a-9afd-3176e3c6b63c",
      title: "Lorem ipsum dolosit amet",
      content: "Isshiki masnuer otsumera okko",
      dueDate: "Sun Jun 30 2024 00:00:00 GMT+0700 (Indochina Time)",
      list: "List 7 ",
      tags: ["Friends"],
      subtasks: [],
      checked: false,
    },
  ],
  toRender: [],
  view: { type: "all", value: "" },
}

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.push(action.payload)
    },
    updateNote: (state, action: PayloadAction<NoteType>) => {
      const note = state.notes.find((note) => note.id === action.payload.id)
      if (note) {
        note.title = action.payload.title
        note.content = action.payload.content
        note.dueDate = action.payload.dueDate
        note.list = action.payload.list
        note.tags = action.payload.tags
        note.subtasks = action.payload.subtasks
      }
    },
    updateNoteRender: (
      state,
      action: PayloadAction<{
        type: "custom" | "list" | "tag" | "all"
        value: string
      }>
    ) => {
      const { type, value } = action.payload

      if (type === "list" && value.length > 0) {
        state.toRender = state.notes.filter((note) => note.list === value)
        state.view = { type, value }
      }

      if (type === "tag" && value.length > 0) {
        state.toRender = state.notes.filter(
          (note) => note.tags.indexOf(value) !== -1
        )
        state.view = { type, value }
      }

      if (type === "custom") {
        switch (value) {
          case "upcoming":
            state.toRender = notesDueThisWeek(state.notes)
            state.view = { type, value }
            break
          case "today":
            state.toRender = notesDueToday(state.notes)
            state.view = { type, value }
            break
          case "this month":
            state.toRender = notesDueThisMonth(state.notes)
            state.view = { type, value }
            break
          case "all tasks":
            state.toRender = state.notes
            state.view = { type, value }
            break
          default:
            break
        }
      }

      if (type === "all" && value === "") {
        if (state.view.type === "list") {
          state.toRender = state.notes.filter(
            (note) => note.list === state.view.value
          )
        }
        if (state.view.type === "tag") {
          state.toRender = state.notes.filter(
            (note) => note.tags.indexOf(state.view.value) !== -1
          )
        }
        if (state.view.type === "custom") {
          switch (state.view.value) {
            case "upcoming":
              state.toRender = notesDueThisWeek(state.notes)
              break
            case "today":
              state.toRender = notesDueToday(state.notes)
              break
            case "this month":
              state.toRender = notesDueThisMonth(state.notes)
              break
            case "all tasks":
              state.toRender = state.notes
              break
            default:
              break
          }
        }
        if (state.view.type === "all") {
          state.toRender = state.notes
        }
      }
    },
    updateNoteCheck: (state, action: PayloadAction<string>) => {
      let index = state.notes.findIndex((note) => note.id === action.payload)
      state.notes[index].checked = !state.notes[index].checked
    },
    updateSubtaskCheck: (
      state,
      action: PayloadAction<{ noteId: string; subtaskName: string }>
    ) => {
      const { noteId, subtaskName } = action.payload
      const noteIndex = state.notes.findIndex((note) => note.id === noteId)
      if (noteIndex !== -1) {
        const subtaskIndex = state.notes[noteIndex].subtasks.findIndex(
          (subtask) => subtask.name === subtaskName
        )
        if (subtaskIndex !== -1) {
          state.notes[noteIndex].subtasks[subtaskIndex].checked =
            !state.notes[noteIndex].subtasks[subtaskIndex].checked
        }
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload)
      if (index !== -1) {
        state.notes.splice(index, 1)
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  addNote,
  updateNote,
  updateNoteRender,
  updateNoteCheck,
  updateSubtaskCheck,
  deleteNote,
} = noteSlice.actions

export default noteSlice.reducer
