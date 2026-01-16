import { LucideIcon } from "lucide-react";

export interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

export interface ToolbarItem {
    label: string;
    icon?: LucideIcon;
    onClick?: () => void;
    isActive?: boolean;
}
