import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { RootState } from "@/lib/redux/store"
import { CalendarX, X } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteNote,
  updateNoteCheck,
  updateNoteRender,
  updateSubtaskCheck,
} from "../features/note/noteSlice"
import { listColors } from "../lib/utils"
import { NoteFormMenu } from "./NoteFormMenu"
import { Button } from "./ui/Button"
import { Checkbox } from "./ui/Checkbox"
import { Separator } from "./ui/Separator"

export function NoteList() {
  const dispatch = useDispatch()
  const listState = useSelector((state: RootState) => state.list.lists)
  const noteState = useSelector((state: RootState) => state.note)

  useEffect(() => {
    dispatch(updateNoteRender({ type: "all", value: "" }))
  }, [noteState.notes])

  if (noteState.toRender.length === 0) return

  return (
    <>
      <Accordion className="mx-1 text-sm" type="single" collapsible>
        {noteState.toRender.map((note) => {
          return (
            <AccordionItem className="relative" key={note.id} value={note.id}>
              <Checkbox
                checked={note.checked}
                className="ml-4 mr-2 h-[0.95rem] w-[0.95rem] z-10 absolute top-[1.09rem]"
                onClick={(e) => {
                  e.stopPropagation()
                  dispatch(updateNoteCheck(note.id))
                }}
              />
              <div className="absolute top-3 right-6 z-10">
                <NoteFormMenu note={note} />

                <Button
                  onClick={() => dispatch(deleteNote(note.id))}
                  variant={"outline"}
                  className="p-1 mr-2 h-fit"
                >
                  <X className="w-3.5 h-3.5 px-0 py-0 text-red-500"></X>
                </Button>
              </div>

              <AccordionTrigger className="flex flex-row relative ml-4">
                <div className="flex flex-col items-start align-middle ml-7 text-left max-w-[calc(100%-8rem)]">
                  <p className="text-[1.05rem] font-semibold break-words">
                    {note.title}
                  </p>
                  {note.list.length > 0 ||
                  note.subtasks.length > 0 ||
                  note.dueDate ? (
                    <div className="min-h-fit flex flex-col sm:flex-row gap-y-2 items-start mt-3.5">
                      {note.list.length > 0 ? (
                        <div
                          className=""
                          onClick={(e) => {
                            e.stopPropagation()
                            dispatch(
                              updateNoteRender({
                                type: "list",
                                value: note.list,
                              })
                            )
                          }}
                        >
                          <Button
                            variant={"ghost"}
                            className="font-medium text-[0.9rem] p-0 h-fit"
                          >
                            <div
                              className="h-[1.15rem] w-[1.15rem] border rounded-sm mr-2"
                              style={{
                                backgroundColor:
                                  listColors[listState.indexOf(note.list) % 10],
                              }}
                            ></div>
                            {note.list}
                          </Button>
                        </div>
                      ) : null}
                      {note.list.length > 0 &&
                      (note.subtasks.length > 0 || note.dueDate) ? (
                        <Separator
                          orientation="vertical"
                          className="font-bold h-5 mx-10 hidden sm:block"
                        />
                      ) : null}
                      {note.subtasks.length > 0 ? (
                        <div className="">
                          <div className="text-[0.9rem]">
                            <span className="text-[0.8rem] px-[0.5rem] py-0.5 mr-1.5 rounded-sm bg-slate-200 text-slate-600 dark:bg-slate-100 dark:text-slate-900 self-end">
                              {note.subtasks.length}
                            </span>
                            <span className="inline font-medium">Subtasks</span>
                          </div>
                        </div>
                      ) : null}
                      {note.subtasks.length > 0 && note.dueDate ? (
                        <Separator
                          orientation="vertical"
                          className="font-bold h-5 mx-10 hidden sm:block"
                        />
                      ) : null}
                      {note.dueDate ? (
                        <div className="flex flex-row">
                          <div className="flex flex-row items-center">
                            <CalendarX className="h-[0.9rem] w-[0.9rem] mr-1 mb-0.5" />
                            <p className="font-semibold text-[0.77rem]">
                              {new Date(note.dueDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}{" "}
                </div>
              </AccordionTrigger>

              <AccordionContent className="ml-7 mt-[-0.190rem] z-10">
                <p className="font-medium ml-4 mb-1 text-[0.9rem] z-10">
                  {note.content}
                </p>
                <div className="ml-3 mt-0.5">
                  {note.tags.map((t) => {
                    return (
                      <Button
                        variant={"secondary"}
                        className="font-semibold border-0 justify-start w-fit h-fit text-[0.65rem] px-2.5 py-1 mr-1 mt-1"
                        key={t + "tag"}
                        onClick={() =>
                          dispatch(updateNoteRender({ type: "tag", value: t }))
                        }
                      >
                        {t}
                      </Button>
                    )
                  })}
                </div>
                {note.subtasks.length > 0 ? (
                  <Separator className="mt-4 mb-3 pr-10 w-[97%]"></Separator>
                ) : null}
                {note.subtasks.map((s) => {
                  return (
                    <div className="relative ml-[0.2rem]" key={s.name}>
                      <Checkbox
                        checked={s.checked}
                        className="ml-3.5 h-[1rem] w-[1rem] z-10 absolute top-[0.6rem]"
                        onClick={(e) => {
                          e.stopPropagation()
                          dispatch(
                            updateSubtaskCheck({
                              noteId: note.id,
                              subtaskName: s.name,
                            })
                          )
                        }}
                      />
                      <Button
                        variant={"ghost"}
                        className="pl-10 py-0 w-full justify-start font-semibold h-9 hover:bg-transparent"
                        onClick={() => {
                          dispatch(
                            updateSubtaskCheck({
                              noteId: note.id,
                              subtaskName: s.name,
                            })
                          )
                        }}
                      >
                        {s.name}
                      </Button>
                    </div>
                  )
                })}
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </>
  )
}
