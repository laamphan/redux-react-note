"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { RootState } from "@/lib/redux/store"
import { cn, listColors } from "@/lib/utils"
import { Dispatch, SetStateAction, useState } from "react"
import { useSelector } from "react-redux"

interface DropdownListsProps {
  listsState: string[]
  list: string
  setList: Dispatch<SetStateAction<string>>
}

export function DropdownLists({
  listsState,
  list,
  setList,
}: DropdownListsProps) {
  const [open, setOpen] = useState(false)
  const listState = useSelector((state: RootState) => state.list.lists)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-fit justify-between bg-transparent")}
        >
          {list.length > 0 ? (
            list
          ) : (
            <p className="text-muted-foreground">Pick a list</p>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {listsState.map((l) => (
                <CommandItem
                  key={l + "list"}
                  value={l}
                  onSelect={(currentValue) => {
                    setList(currentValue === list ? "" : l)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      list === l ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div
                    className="h-[1.15rem] w-[1.15rem] border rounded-sm mr-3"
                    style={{
                      backgroundColor: listColors[listState.indexOf(l) % 10],
                    }}
                  ></div>

                  {l}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
