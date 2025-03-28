"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import {
  ImagePlusIcon,
  MoreVerticalIcon,
  RotateCcwIcon,
  Sparkles,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
interface ThumbnailMenuProps {
  setThumbnailModalOpen: Dispatch<SetStateAction<boolean>>;
  videoId: string;
}

const ThumbnailMenu = ({
  videoId,
  setThumbnailModalOpen,
}: ThumbnailMenuProps) => {
  const utils = trpc.useUtils();
  const restore = trpc.videos.restore.useMutation({
    onSuccess: () => {
      utils.studio.getMany.invalidate();
      utils.studio.getOne.invalidate({ id: videoId });
      toast.success("Thumbnail Restored");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="icon"
          className="bg-black/50 hover:bg-black/50 absolute top-1 right-1 rounded-full opacity-100 md:opacity-0 group-hover:opacity-100 duration-300 size-7"
        >
          <MoreVerticalIcon className="text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="right">
        <DropdownMenuItem onClick={() => setThumbnailModalOpen(true)}>
          <ImagePlusIcon className="size-4 mr-1" />
          Change
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Sparkles className="size-4 mr-1" />
          AI Generate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => restore.mutate({ id: videoId })}>
          <RotateCcwIcon className="size-4 mr-1" />
          Restore
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ThumbnailMenu;
