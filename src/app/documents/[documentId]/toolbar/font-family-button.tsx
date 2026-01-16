import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { ChevronDownIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const fonts = [
    { label: 'Arial', value: 'Arial' },
    { label: 'Georgia', value: 'Georgia' },
    { label: 'Impact', value: 'Impact' },
    { label: 'Tahoma', value: 'Tahoma' },
    { label: 'Times New Roman', value: 'Times New Roman' },
    { label: 'Verdana', value: 'Verdana' },
];

export const FontFamilyButton = () => {
    const { editor } = useEditorStore();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn('h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
                    <span className="truncate">
                        {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0"></ChevronDownIcon>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {fonts.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes('textStyle').fontFamily === value && "bg-neutral-200/80"
                        )}
                    >
                        <span className="text-sm" style={{ fontFamily: value }}>{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
