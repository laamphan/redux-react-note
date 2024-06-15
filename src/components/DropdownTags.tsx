"use client"

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
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction, useState } from "react"

interface DropdownTagsProps {
  tags: string[]
  setTags: Dispatch<SetStateAction<string[]>>
  remainingTags: string[]
  setRemainingTags: Dispatch<SetStateAction<string[]>>
}

export function DropdownTags({
  tags,
  setTags,
  remainingTags,
  setRemainingTags,
}: DropdownTagsProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "font-semibold border-0 w-fit h-fit text-xs px-3 py-2 mb-1 bg-slate-200"
          )}
        >
          {"+ Add tag"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {remainingTags.length > 0
                ? remainingTags.map((t, index) => (
                    <CommandItem
                      key={t + "tag"}
                      value={t}
                      onSelect={() => {
                        setOpen(false)
                        setRemainingTags((tags) =>
                          tags.filter((_, i) => i !== index)
                        )
                        setTags(tags.concat(t))
                      }}
                    >
                      {t}
                    </CommandItem>
                  ))
                : null}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
