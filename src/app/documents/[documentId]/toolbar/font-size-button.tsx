import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { MinusIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

const DEFAULT = 16
export const FontSizeButton = () => {
    const { editor } = useEditorStore()
    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
        : DEFAULT

    const [fontSize, setFontSize] = useState<string>(currentFontSize)
    const [inputValue, setInputValue] = useState<string>(fontSize)
    const [isEditing, setIsEditing] = useState<boolean>(false)

    const isSelectionEmpty = editor?.state.selection.empty ?? true

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize)
        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!(/^\d+$/.test(e.target.value))) {
            return
        }
        setInputValue(e.target.value)
    }
    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }
    const increment = () => {
        const newSize = parseInt(fontSize) + 1
        updateFontSize(newSize.toString())
    }
    const decrement = () => {
        const newSize = parseInt(fontSize) - 1
        if (newSize > 0) {
            updateFontSize(newSize.toString())
        }
    }
    const disabledClass = 'opacity-50 cursor-not-allowed'

    return (
        <div className="flex items-center gap-x-0.5">
            <button
                className={`h-7 w-7 shrink-0 flex items-center justify-center rounded-sm px-1.5 ${isSelectionEmpty ? disabledClass : 'hover:bg-neutral-200/80'}`}
                onClick={decrement}
                disabled={isSelectionEmpty}
            >
                <MinusIcon className="size-4"></MinusIcon>
            </button>
            {isEditing ? (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    disabled={isSelectionEmpty}
                    className={`h-7 w-10 text-sm text-center rounded-sm border border-neutral-400 bg-transparent focus:outline-none focus:ring-0 ${isSelectionEmpty ? disabledClass : ''}`}
                ></input>
            ) : (
                <button
                    onClick={() => {
                        setIsEditing(true)
                        setFontSize(currentFontSize)
                    }}
                    disabled={isSelectionEmpty}
                    className={cn(`h-7 w-10 text-sm text-center rounded-sm border-neutral-400 border bg-transparent ${isSelectionEmpty ? 'cursor-not-allowed' : 'cursor-text hover:bg-neutral-200/80'}`)}
                >
                    {currentFontSize}
                </button>
            )}
            <button
                className={`h-7 w-7 shrink-0 flex items-center justify-center rounded-sm px-1.5 ${isSelectionEmpty ? disabledClass : 'hover:bg-neutral-200/80'}`}
                onClick={increment}
                disabled={isSelectionEmpty}
            >
                <PlusIcon className="size-4"></PlusIcon>
            </button>
        </div>
    )
}