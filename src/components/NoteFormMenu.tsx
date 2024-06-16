import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
// import * as React from "react"
import { RootState } from "@/lib/redux/store"
import { PencilIcon, PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ReactTextareaAutosize from "react-textarea-autosize"
import { v4 as uuidV4 } from "uuid"
import {
  NoteType,
  SubtaskType,
  addNote,
  updateNote,
} from "../features/note/noteSlice"
import { DropdownLists } from "./DropdownLists"
import { DropdownTags } from "./DropdownTags"
import { Checkbox } from "./ui/Checkbox"
import { DatePicker } from "./ui/DatePicker"
import { Label } from "./ui/Label"
import { Separator } from "./ui/Separator"

interface NoteFormMenuProps {
  note?: NoteType
  children?: React.ReactNode
}

export interface NoteFormData {
  title: string
  content: string
  list: string
}

export const NoteFormMenu = ({ note }: NoteFormMenuProps) => {
  const listState = useSelector((state: RootState) => state.list)
  const tagState = useSelector((state: RootState) => state.tag)

  const [noteFormData, setNoteFormData] = useState<NoteFormData>({
    title: note?.title || "",
    content: note?.content || "",
    list: note?.list || "",
  })

  const [date, setDate] = useState<Date | undefined>(
    note?.dueDate ? new Date(note.dueDate) : undefined
  )

  const [list, setList] = useState(note?.list || "")
  const [tags, setTags] = useState(note?.tags || [])
  const [remainingTags, setRemainingTags] = useState<string[]>(
    tagState.tags.filter((tag) => !tags.includes(tag))
  )

  const [subtasks, setSubtasks] = useState<SubtaskType[]>(note?.subtasks || [])
  const [subtask, setSubtask] = useState<SubtaskType>({
    name: "",
    checked: false,
  })
  const [isAddingSubtask, setIsAddingSubtask] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tags.length === 0) setRemainingTags(tagState.tags)
    else {
      for (let i = 0; i < tagState.tags.length; i++) {
        if (
          tags.indexOf(tagState.tags[i]) === -1 &&
          remainingTags.indexOf(tagState.tags[i]) === -1
        ) {
          setRemainingTags((remainingTags) =>
            remainingTags.concat(tagState.tags[i])
          )
        }
      }
    }
  }, [])

  useEffect(() => {
    setSubtasks(note?.subtasks || [])
  }, [note])

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && subtask.name.length > 0) {
      if (subtasks.length > 0) {
        const subtasksNames = subtasks.map((s) => s.name)
        if (subtasksNames.indexOf(subtask.name) === -1) {
          setSubtasks(subtasks.concat(subtask))
        }
      } else setSubtasks(subtasks.concat(subtask))

      setSubtask({
        name: "",
        checked: false,
      })
      setIsAddingSubtask(!isAddingSubtask)
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="text-slate-400" asChild>
        {!note ? (
          <Button
            onClick={() => {
              setList("")
              setIsAddingSubtask(false)
              setSubtask({ name: "", checked: false })
              setSubtasks([])
              setTags([])
              setRemainingTags(tagState.tags)
              setDate(undefined)
              setNoteFormData({ content: "", title: "", list: "" })
            }}
            className="w-full font-semibold justify-start py-[1.3rem] mb-1.5"
            variant={"outline"}
          >
            <PlusIcon
              strokeWidth={3.7}
              className="h-4 w-4 mr-3 ml-[0.18rem] font-bold"
            ></PlusIcon>
            Add New Task
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsAddingSubtask(false)
              setSubtask({ name: "", checked: false })
              setSubtasks(note.subtasks)
            }}
            variant={"outline"}
            className="p-1 mr-2 h-fit"
          >
            <PencilIcon className="w-3.5 h-3.5 px-0 py-0"></PencilIcon>
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="overflow-y-auto bg-white xl:bg-[#f4f4f4] m-0 xl:m-6 xl:h-[calc(100%-3rem)] h-full rounded-xl"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold mb-4">Task :</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              placeholder="Renew driver's license"
              className="col-span-7 xl:bg-transparent bg-white"
              value={noteFormData.title}
              onChange={(e) =>
                setNoteFormData({ ...noteFormData, title: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <ReactTextareaAutosize
              className="col-span-7 min-h-[80px] flex w-full rounded-md border border-input xl:bg-transparent bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Description"
              value={noteFormData.content}
              onChange={(e) =>
                setNoteFormData({ ...noteFormData, content: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="">List</Label>
            <DropdownLists
              listsState={listState.lists}
              list={list}
              setList={setList}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="">Due date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label className="mt-2.5">Tags</Label>
            <div className="col-span-3">
              {tags.map((t, index) => {
                return (
                  <Button
                    variant={"secondary"}
                    className="font-semibold border-0 w-fit h-fit text-xs px-3 mr-1 mb-1"
                    key={t + "tag"}
                    onClick={() => {
                      setTags((tags) => tags.filter((_, i) => i !== index))
                      setRemainingTags(remainingTags.concat(t))
                    }}
                  >
                    {t}
                  </Button>
                )
              })}
              <DropdownTags
                tags={tags}
                setTags={setTags}
                remainingTags={remainingTags}
                setRemainingTags={setRemainingTags}
              />
            </div>
          </div>
          <div className="items-center">
            <h2 className="text-3xl font-bold mt-3 mb-4 w-full">Subtasks :</h2>
            <Button
              className="w-full font-semibold text-slate-400 justify-start pl-3.5"
              variant={"ghost"}
              onClick={() => setIsAddingSubtask(!isAddingSubtask)}
            >
              <PlusIcon
                strokeWidth={3.7}
                className="h-4 w-4 mr-2.5 font-bold "
              />
              Add New Task
            </Button>
            {isAddingSubtask ? (
              <Input
                placeholder="Walk the dog"
                type="text"
                value={subtask.name}
                onChange={(e) =>
                  setSubtask({ name: e.target.value, checked: false })
                }
                onKeyDown={handleKeyDown}
                className="mt-1 mb-1 xl:bg-transparent bg-white"
                autoFocus
              />
            ) : null}
            <div className="">
              {subtasks.map((s, index) => {
                return (
                  <div className="relative" key={s.name}>
                    <Separator />
                    <Checkbox
                      checked={s.checked}
                      className="ml-3.5 h-[0.95rem] w-[0.95rem] z-10 absolute top-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSubtasks((subtasks) =>
                          subtasks.map((st) =>
                            st.name === s.name
                              ? { ...st, checked: !st.checked }
                              : st
                          )
                        )
                      }}
                    />
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setSubtasks((subtasks) =>
                          subtasks.filter((_, i) => i !== index)
                        )
                      }}
                      className="py-2.5 pl-10 my-0.5 w-full justify-start"
                    >
                      {s.name}
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              disabled={
                noteFormData.title === "" || noteFormData.content === ""
              }
              type="submit"
              onClick={() => {
                if (note) {
                  dispatch(
                    updateNote({
                      id: note?.id,
                      title: noteFormData.title,
                      content: noteFormData.content,
                      dueDate: date?.toString(),
                      list: list,
                      tags: tags,
                      subtasks: subtasks,
                      checked: false,
                    })
                  )
                } else {
                  dispatch(
                    addNote({
                      id: uuidV4(),
                      title: noteFormData.title,
                      content: noteFormData.content,
                      dueDate: date?.toString(),
                      list: list,
                      tags: tags,
                      subtasks: subtasks,
                      checked: false,
                    })
                  )
                  setNoteFormData({
                    title: "",
                    content: "",
                    list: "",
                  })
                  setDate(undefined)
                  setTags([])
                  setRemainingTags([])
                  setSubtask({ name: "", checked: false })
                  setSubtasks([])
                  setList("")
                  setIsAddingSubtask(false)
                }
              }}
            >
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
