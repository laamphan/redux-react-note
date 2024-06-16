import { RootState } from "@/lib/redux/store"
import { PlusIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addList } from "../features/list/listSlice"
import { updateNoteRender } from "../features/note/noteSlice"
import { listColors } from "../lib/utils"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

interface ListsProps {}

export const Lists = ({}: ListsProps) => {
  const listState = useSelector((state: RootState) => state.list.lists)
  const noteState = useSelector((state: RootState) => state.note.notes)

  const [list, setList] = useState("")
  const [isAddingList, setIsAddingList] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateNoteRender({ type: "all", value: "" }))
  }, [noteState])

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      dispatch(addList(list))
      setList("")
      setIsAddingList(!isAddingList)
    }
  }

  return (
    <div className="my-4">
      <h3 className="ml-2 text-xs font-bold text-zinc-700 mb-1">LISTS</h3>
      <div className="flex flex-col ">
        {listState.map((l) => {
          return (
            <Button
              key={l + "list"}
              variant={"ghost"}
              className="font-semibold border-0 justify-start hover:bg-slate-200"
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
          )
        })}
      </div>

      {isAddingList ? (
        <Input
          type="text"
          value={list}
          onChange={(e) => setList(e.target.value)}
          onKeyDown={handleKeyDown}
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
  )
}
