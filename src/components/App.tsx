import {
  CalendarDays,
  ChevronsRight,
  ListChecks,
  StickyNote,
} from "lucide-react"
import { useDispatch } from "react-redux"
import { updateNoteRender } from "../features/note/noteSlice"
import { Lists } from "./Lists"
import { MenuOnToggle } from "./MenuOnToggle"
import { ModeToggle } from "./ModeToggle"
import { NoteFormMenu } from "./NoteFormMenu"
import { NoteList } from "./NoteList"
import { Tags } from "./Tags"
import { Button } from "./ui/Button"
import { Separator } from "./ui/Separator"

export function App() {
  const dispatch = useDispatch()

  return (
    <div className="flex">
      <div className="hidden xl:block w-full max-w-[21.5rem] fixed left-0 h-full">
        <div className="h-full">
          <div className="overflow-y-auto m-4 p-4 h-[calc(100%-2rem)] rounded-xl bg-[#f4f4f4] dark:bg-background">
            <div className="flex flex-row justify-between items-center sm:text-left">
              <div className="text-foreground text-3xl font-bold">Menu</div>
              <ModeToggle />
            </div>
            <div className="mt-7 ml-1 mb-2">
              <h3 className="text-xs font-bold mb-1">TASKS</h3>
              <Button
                className="w-full font-semibold border-0 justify-start mb-1 hover:bg-zinc-200 dark:hover:bg-accent"
                variant={"ghost"}
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
              <Button
                className="w-full font-semibold border-0 justify-start mb-1 hover:bg-zinc-200 dark:hover:bg-accent"
                variant={"ghost"}
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
              <Button
                className="w-full font-semibold border-0 justify-start mb-1 hover:bg-zinc-200 dark:hover:bg-accent"
                variant={"ghost"}
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
              <Button
                className="w-full font-semibold border-0 justify-start mb-1 hover:bg-zinc-200 dark:hover:bg-accent"
                variant={"ghost"}
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
            </div>
            <Separator />
            <Lists />
            <Separator />
            <Tags />
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"></div>
          </div>
        </div>
      </div>
      <div className="w-full px-5 py-2 mx-0 xl:ml-[21.5rem] xl:mr-[27rem]">
        <div className="px-1 py-5 mb-6">
          <MenuOnToggle />
          <h1
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl cursor-pointer"
            onClick={() => {
              dispatch(
                updateNoteRender({
                  type: "custom",
                  value: "all tasks",
                })
              )
            }}
          >
            Tasks
          </h1>
        </div>

        <NoteFormMenu />
        <NoteList />
      </div>
      <div className="hidden xl:block h-screen top-0"></div>
    </div>
  )
}
