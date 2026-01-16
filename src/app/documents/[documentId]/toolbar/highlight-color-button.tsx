import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { HighlighterIcon } from "lucide-react"
import { ColorResult, SketchPicker } from "react-color"

export const HighlightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes('highlight').color || '#FFFFFF'
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
                    <HighlighterIcon className="size-4"></HighlighterIcon>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                <SketchPicker color={value} onChange={onChange}></SketchPicker>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}