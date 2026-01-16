import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"

export const AlignButton = () => {
    const { editor } = useEditorStore()
    const alignArr = [
        {
            label: 'Align Left',
            value: 'left',
            icon: AlignLeftIcon
        },
        {
            label: 'Center',
            value: 'center',
            icon: AlignJustifyIcon
        },
        {
            label: 'Align Right',
            value: 'right',
            icon: AlignRightIcon
        }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
                    <AlignLeftIcon></AlignLeftIcon>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignArr.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn('flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
                        )}
                    >
                        <Icon className="size-4"></Icon>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}