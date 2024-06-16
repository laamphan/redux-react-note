import { RootState } from "@/lib/redux/store"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateNoteRender } from "../features/note/noteSlice"
import { addTag } from "../features/tag/tagSlice"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

export const Tags = () => {
  const tagState = useSelector((state: RootState) => state.tag)

  const [tag, setTag] = useState("")
  const [isAddingTag, setIsAddingTag] = useState(false)

  const dispatch = useDispatch()

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      dispatch(addTag(tag))
      setTag("")
      setIsAddingTag(!isAddingTag)
    }
  }

  return (
    <div className="my-4">
      <h3 className="ml-2 text-xs font-bold mb-3">TAGS</h3>
      <div className="inline-flex flex-wrap p-1">
        {tagState.tags.map((t) => {
          return (
            <Button
              variant={"secondary"}
              className="font-semibold border-0 justify-start w-fit h-fit text-xs px-3 py-2 mr-1 mt-1 bg-zinc-300 hover:bg-zinc-200 dark:bg-secondary dark:hover:bg-secondary/70"
              key={t + "tag"}
              onClick={() =>
                dispatch(updateNoteRender({ type: "tag", value: t }))
              }
            >
              {t}
            </Button>
          )
        })}
        {isAddingTag ? (
          <Input
            placeholder="Enter new tag:"
            type="text"
            value={tag}
            className=" font-semibold mt-1 mr-1 w-fit outline-none inline h-fit rounded-md  pl-3 pr-2 py-2 text-xs  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setTag(e.target.value)}
            maxLength={30}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : null}
        <Button
          className="font-semibold border-0 w-fit h-fit text-xs px-3 py-2 mr-1 mt-1 inline bg-zinc-200 dark:bg-secondary/20 dark:hover:bg-secondary"
          variant={"secondary"}
          onClick={() => {
            setIsAddingTag(!isAddingTag)
          }}
        >
          + Add Tag
        </Button>
      </div>
    </div>
  )
}
