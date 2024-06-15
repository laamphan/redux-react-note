import { NoteType } from "@/features/note/noteSlice"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const listColors = [
  "#ffadad",
  "#9bf6ff",
  "#fdffb6",
  "#ffd6a5",
  "#caffbf",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
  "#ffebff",
  "#000000",
]

export const notesDueToday = (notes: NoteType[]) => {
  const now = new Date()
  const currentDate = now.getDate()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return notes.filter((note) => {
    if (note.dueDate) {
      const dueDate = new Date(note.dueDate)
      return (
        dueDate.getDate() === currentDate &&
        dueDate.getMonth() === currentMonth &&
        dueDate.getFullYear() === currentYear
      )
    } else return false
  })
}

export const notesDueThisWeek = (notes: NoteType[]) => {
  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(now)
  endOfWeek.setDate(now.getDate() + 7)

  return notes.filter((note) => {
    if (note.dueDate) {
      const dueDate = new Date(note.dueDate)
      return dueDate >= now && dueDate <= endOfWeek
    }
  })
}

export const notesDueThisMonth = (notes: NoteType[]) => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return notes.filter((note) => {
    if (note.dueDate) {
      const dueDate = new Date(note.dueDate)
      return (
        dueDate.getMonth() === currentMonth &&
        dueDate.getFullYear() === currentYear
      )
    }
  })
}
