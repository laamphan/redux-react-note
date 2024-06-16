import { Button } from "@/components/ui/Button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/Sheet"
import { RootState } from "@/lib/redux/store"
import {
  CalendarDays,
  ChevronsRight,
  ListChecks,
  MenuIcon,
  PlusIcon,
  StickyNote,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addList } from "../features/list/listSlice"
import { updateNoteRender } from "../features/note/noteSlice"
import { addTag } from "../features/tag/tagSlice"
import { listColors } from "../lib/utils"
import { Input } from "./ui/Input"
import { Separator } from "./ui/Separator"

interface MenuOnToggleProps {}

export const MenuOnToggle = ({}: MenuOnToggleProps) => {
  const listState = useSelector((state: RootState) => state.list.lists)
  const noteState = useSelector((state: RootState) => state.note.notes)

  const [list, setList] = useState("")
  const [isAddingList, setIsAddingList] = useState(false)
  const [tag, setTag] = useState("")
  const [isAddingTag, setIsAddingTag] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateNoteRender({ type: "all", value: "" }))
  }, [noteState])

  const tagState = useSelector((state: RootState) => state.tag)

  const handleKeyDownList = (event: any) => {
    if (event.key === "Enter") {
      dispatch(addList(list))
      setList("")
      setIsAddingList(!isAddingList)
    }
  }

  const handleKeyDownTag = (event: any) => {
    if (event.key === "Enter") {
      dispatch(addTag(tag))
      setTag("")
      setIsAddingTag(!isAddingTag)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild className="block xl:hidden">
        <Button variant="outline" className="px-3 pt-3 pb-[1.9rem] mb-3">
          <MenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-7 ml-1 mb-2">
          <h3 className="text-xs font-bold text-zinc-700 mb-1">TASKS</h3>
          <SheetClose asChild>
            <Button
              className="w-full font-semibold border-0 justify-start mb-1"
              variant={"outline"}
              onClick={() => {
                dispatch(
                  updateNoteRender({
                    type: "custom",
                    value: "upcoming",
                  })
                )
              }}
            >
              <ChevronsRight className="h-[1.1rem] w-[1.1rem] mr-1.5" />
              Upcoming
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="w-full font-semibold border-0 justify-start mb-1"
              variant={"outline"}
              onClick={() => {
                dispatch(
                  updateNoteRender({
                    type: "custom",
                    value: "today",
                  })
                )
              }}
            >
              <ListChecks className="h-[1.1rem] w-[1.1rem] mr-1.5" />
              Today
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="w-full font-semibold border-0 justify-start mb-1"
              variant={"outline"}
              onClick={() => {
                dispatch(
                  updateNoteRender({
                    type: "custom",
                    value: "this month",
                  })
                )
              }}
            >
              <CalendarDays className="h-[1.1rem] w-[1.1rem] mr-1.5" />
              This month
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button
              className="w-full font-semibold border-0 justify-start mb-1"
              variant={"outline"}
              onClick={() => {
                dispatch(
                  updateNoteRender({
                    type: "custom",
                    value: "all tasks",
                  })
                )
              }}
            >
              <StickyNote className="h-[1.1rem] w-[1.1rem] mr-1.5" />
              All tasks
            </Button>
          </SheetClose>
        </div>
        <Separator />
        {/* <Lists /> */}
        <div className="my-4">
          <h3 className="ml-2 text-xs font-bold text-zinc-700 mb-1">LISTS</h3>
          <div className="flex flex-col ">
            {listState.map((l) => {
              return (
                <SheetClose asChild key={l + "list"}>
                  <Button
                    key={l + "list"}
                    variant={"ghost"}
                    className="font-semibold border-0 justify-start"
                    onClick={() => {
                      dispatch(updateNoteRender({ type: "list", value: l }))
                    }}
                  >
                    <div
                      className="h-[1.15rem] w-[1.15rem] border rounded-sm mr-3"
                      style={{
                        backgroundColor: listColors[listState.indexOf(l) % 10],
                      }}
                    ></div>
                    {l}
                  </Button>
                </SheetClose>
              )
            })}
          </div>

          {isAddingList ? (
            <Input
              type="text"
              value={list}
              onChange={(e) => setList(e.target.value)}
              onKeyDown={handleKeyDownList}
              className="mt-1 mb-1 xl:bg-transparent bg-white"
              placeholder="Enter list name:"
              autoFocus
            />
          ) : null}

          <Button
            className="w-full font-semibold text-slate-400 justify-start border-0"
            variant={"ghost"}
            onClick={() => setIsAddingList(!isAddingList)}
          >
            <PlusIcon
              strokeWidth={3.3}
              className="h-4 w-4 mr-[0.8rem] ml-[0.1rem] font-bold "
            />
            Add New List
          </Button>
        </div>

        <Separator />

        {/* <Tags /> */}
        <div className="my-4">
          <h3 className="ml-2 text-xs font-bold text-zinc-700 mb-3">TAGS</h3>
          <div className="inline-flex flex-wrap p-1">
            {tagState.tags.map((t) => {
              return (
                <SheetClose asChild key={t + "tag"}>
                  <Button
                    key={t + "tag"}
                    variant={"secondary"}
                    className="font-semibold border-0 justify-start w-fit h-fit text-xs px-3 py-2 mr-1 mt-1"
                    onClick={() =>
                      dispatch(updateNoteRender({ type: "tag", value: t }))
                    }

                    // onClick={() => dispatch(deleteTag(t))}
                  >
                    {t}
                  </Button>
                </SheetClose>
              )
            })}
            {isAddingTag ? (
              <Input
                placeholder="Enter new tag:"
                type="text"
                value={tag}
                className="xl:bg-transparent bg-white font-semibold mt-1 mr-1 w-fit outline-none inline h-fit rounded-md  pl-3 pr-2 py-2 text-xs  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(e) => setTag(e.target.value)}
                maxLength={30}
                onKeyDown={handleKeyDownTag}
                autoFocus
              />
            ) : null}
            <Button
              className="font-semibold border-0 w-fit h-fit text-xs px-3 py-2 mr-1 mt-1 inline bg-slate-200"
              variant={"secondary"}
              onClick={() => {
                setIsAddingTag(!isAddingTag)
              }}
            >
              + Add Tag
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
