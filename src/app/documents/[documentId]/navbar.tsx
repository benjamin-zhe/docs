'use client'
import Image from "next/image"
import Link from "next/link"
import { DocumentInput } from "./document-input"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "@/components/ui/menubar"
import { BoldIcon, FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, ItalicIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, StrikethroughIcon, TextIcon, TrashIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { BsFilePdf } from "react-icons/bs"
import { useEditorStore } from "@/store/use-editor-store"
import { TableSelector } from "./navbar/table-selector"
export const Navbar = () => {
    const { editor } = useEditorStore()
    const onDownload = (blob: Blob, filename: stirng) => {
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        window.URL.revokeObjectURL(url)
    }
    const onSaveJson = () => {
        if (!editor) return
        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)], { type: 'application/json' })
        onDownload(blob, 'document.json')
    }
    const onSaveHtml = () => {
        if (!editor) return
        const content = editor.getHTML()
        const blob = new Blob([content], { type: 'text/html' })
        onDownload(blob, 'document.html')
    }
    const onSaveText = () => {
        if (!editor) return
        const content = editor.getText()
        const blob = new Blob([content], { type: 'text/plain' })
        onDownload(blob, 'document.txt')
    }
    return (
        <nav className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Image src="/logo.svg" alt="Logo" width={36} height={36}></Image>
                </Link>
                <div className="flex flex-col">
                    <DocumentInput></DocumentInput >
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2"></FileIcon>
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJson}>
                                                <FileJsonIcon className="size-4 mr-2"></FileJsonIcon>
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHtml}>
                                                <GlobeIcon className="size-4 mr-2"></GlobeIcon>
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2"></BsFilePdf>
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2"></FileTextIcon>
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                        <MenubarItem>
                                            <FilePlusIcon className="size-4 mr-2"></FilePlusIcon>
                                            New Document
                                        </MenubarItem>
                                        <MenubarSeparator></MenubarSeparator>
                                        <MenubarItem>
                                            <FilePenIcon className="size-4 mr-2"></FilePenIcon>
                                            Rename
                                        </MenubarItem>
                                        <MenubarItem>
                                            <TrashIcon className="size-4 mr-2"></TrashIcon>
                                            Remove
                                        </MenubarItem>
                                        <MenubarSeparator></MenubarSeparator>
                                        <MenubarItem onClick={() => window.print()}>
                                            <PrinterIcon className="size-4 mr-2"></PrinterIcon>
                                            Print <MenubarShortcut>⌘P</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2"></Undo2Icon>
                                        Undo<MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2"></Redo2Icon>
                                        Redo<MenubarShortcut>⌘Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <div className="p-0">
                                        <TableSelector />
                                    </div>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2"></TextIcon>
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2"></BoldIcon>
                                                Bold<MenubarShortcut>⌘B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2"></ItalicIcon>
                                                Italic<MenubarShortcut>⌘I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2"></UnderlineIcon>
                                                Underline<MenubarShortcut>⌘U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="size-4 mr-2"></StrikethroughIcon>
                                                Strikethrough<MenubarShortcut className="ml-3">⌘K</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                        <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                            <RemoveFormattingIcon className="size-4 mr-2"></RemoveFormattingIcon>
                                            Clear formatting
                                        </MenubarItem>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav >
    )
}