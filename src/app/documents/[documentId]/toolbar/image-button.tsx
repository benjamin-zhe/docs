import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/store/use-editor-store"
import { ImageIcon, SearchIcon, UploadIcon } from "lucide-react"
import { useState } from "react"

export const ImageButton = () => {
    const { editor } = useEditorStore()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imgUrl, setImgUrl] = useState('')

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }
    const onUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    onChange((e.target as FileReader).result as string)
                }
                reader.readAsDataURL(file)
            }
        }
        input.click()
    }
    const handleImageUrlSubmit = () => {
        if (imgUrl) {
            onChange(imgUrl)
            setImgUrl('')
            setIsDialogOpen(false)
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn('h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
                        <ImageIcon className="size-4"></ImageIcon>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => onUpload()}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setIsDialogOpen(true) }}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste img url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogTitle>Insert Image URL</DialogTitle>
                    <Input placeholder="Insert image url"
                        value={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleImageUrlSubmit()
                            }
                        }}
                    ></Input>
                    <DialogFooter>
                        <Button onClick={handleImageUrlSubmit}>Insert</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}