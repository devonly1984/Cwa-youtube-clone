"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { config } from "@/lib/config";
import { ListPlusIcon, MoreVerticalIcon, ShareIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
interface VideoMenuProps {
  videoId: string;
  variant?: "ghost" | "secondary";
  onRemove?: () => void;
}
//TODO: implement what's left
const VideoMenu = ({ videoId, variant, onRemove }: VideoMenuProps) => {
    const onShare = ()=>{
        const fullUrl = `${config.vercel.url} || "http://localhost:3000/videos/${videoId}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success("Link copied to the clipboard")
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon" className="rounded-full">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onClick={onShare}>
          <ShareIcon className="size-4 mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <ListPlusIcon className="size-4 mr-2" />
          Add To Playlist
        </DropdownMenuItem>
        {onRemove && (
          <DropdownMenuItem onClick={onRemove}>
            <Trash2Icon className="size-4 mr-2" />
            Remove
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default VideoMenu;
