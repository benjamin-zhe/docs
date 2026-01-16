'use client';
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { Bold, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheck, UnderlineIcon, Undo2Icon } from "lucide-react";
import { ToolbarButton } from "./toolbar/toolbar-button";
import { FontFamilyButton } from "./toolbar/font-family-button";
import { HeadingLevelButton } from "./toolbar/heading-button";
import { TextColorButton } from "./toolbar/text-color-button";
import { HighlightColorButton } from "./toolbar/highlight-color-button";
import { LinkButton } from "./toolbar/link-button";
import { ImageButton } from "./toolbar/image-button";
import { AlignButton } from "./toolbar/align-button";
import { ListButton } from "./toolbar/list-button";
import { FontSizeButton } from "./toolbar/font-size-button";
import { LineHeightButton } from "./toolbar/line-height-button";

export const Toolbar = () => {
    const { editor } = useEditorStore();

    const sections: {
        label: string,
        icon: LucideIcon,
        onClick?: () => void,
        isActive?: boolean,
    }[][] = [
            [
                {
                    label: 'Undo',
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run(),
                },
                {
                    label: 'Redo',
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run(),
                },
                {
                    label: 'Print',
                    icon: PrinterIcon,
                    onClick: () => window.print(),
                },
                {
                    label: 'Spell Check',
                    icon: SpellCheck,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute('spellcheck');
                        editor?.view.dom.setAttribute('spellcheck', current === 'true' ? 'false' : 'true');
                    }
                }
            ],
            [
                {
                    label: 'Bold',
                    icon: Bold,
                    isActive: editor?.isActive('bold'),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: 'Italic',
                    icon: ItalicIcon,
                    isActive: editor?.isActive('italic'),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: 'Underline',
                    icon: UnderlineIcon,
                    isActive: editor?.isActive('underline'),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
            ],
            [
                {
                    label: 'Comment',
                    icon: MessageSquarePlusIcon,
                    isActive: false
                },
                {
                    label: 'List Todo',
                    icon: ListTodoIcon,
                    isActive: editor?.isActive('taskList'),
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                },
                {
                    label: 'Remove Formatting',
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                }
            ]
        ];

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {sections[0].map((item) => (
                <ToolbarButton key={item.label} {...item}></ToolbarButton>
            ))}
            <Separator orientation="vertical" className="h-6 bg-neutral-300 " />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300 " />
            <HeadingLevelButton></HeadingLevelButton>
            <Separator orientation="vertical" className="h-6 bg-neutral-300 " />
            <FontSizeButton></FontSizeButton>
            <Separator orientation="vertical" className="h-6 bg-neutral-300 " />
            {sections[1].map((item) => (
                <ToolbarButton key={item.label} {...item}></ToolbarButton>
            ))}
            <TextColorButton></TextColorButton>
            <HighlightColorButton></HighlightColorButton>
            <Separator orientation="vertical" className="h-6 bg-neutral-300 " />
            <LinkButton></LinkButton>
            <ImageButton></ImageButton>
            <AlignButton></AlignButton>
            <LineHeightButton></LineHeightButton>
            <ListButton></ListButton>
            {sections[2].map((item) => (
                <ToolbarButton key={item.label} {...item}></ToolbarButton>
            ))}
        </div>
    );
};
