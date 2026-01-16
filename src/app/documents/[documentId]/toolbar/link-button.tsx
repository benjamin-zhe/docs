import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { Link2Icon } from "lucide-react"
import { useState } from "react"

export const LinkButton = () => {
    const { editor } = useEditorStore()
    const [value, setValue] = useState(editor?.getAttributes('link').href || '')

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
        setValue('')
    }
    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes('link').href || '')
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button className={cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
                    <Link2Icon className="size-4"></Link2Icon>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></Input>
                <Button onClick={() => onChange(value)}>Apply</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}