"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SidebarMenu = ({  videoId }: {videoId:string}) => {
    const utils = trpc.useUtils();
    const router = useRouter();
    const update = trpc.videos.update.useMutation({
      onSuccess: () => {
        utils.studio.getMany.invalidate();
        utils.studio.getOne.invalidate({ id: videoId });
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
    const remove = trpc.videos.remove.useMutation({
      onSuccess: () => {
        utils.studio.getMany.invalidate();
        toast.success("Video Removed");
        router.push(`/studio`);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  return (
    <>
      <Button type="submit" disabled={update.isPending}>
        Save
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant={"ghost"} size={"icon"}>
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => remove.mutate({ id: videoId })}>
            <TrashIcon className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default SidebarMenu;
