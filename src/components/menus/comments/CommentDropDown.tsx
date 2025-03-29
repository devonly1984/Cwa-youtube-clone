"use client"
import { trpc } from "@/trpc/client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Comments } from "@/types";
import { toast } from "sonner";
interface CommentDropDownProps {
    comment:Comments;
}
const CommentDropDown = ({comment}:CommentDropDownProps) => {
    const { userId } = useAuth();
    const clerk = useClerk();
    const utils = trpc.useUtils();
    const remove = trpc.comments.remove.useMutation({
        onSuccess:()=>{
            toast.success("Comment Removed")
            utils.comments.getMany.invalidate({ videoId: comment.id });
        },
        onError:(error)=>{
            toast.error("Something went wrong");
            if (error?.data?.code==='UNAUTHORIZED') {
                clerk.openSignIn();
            }
        }
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon" className="size-8">
          <MoreVerticalIcon className="" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {}}>
          <MessageSquareIcon className="size-4" />
          Reply
        </DropdownMenuItem>
        {comment.user.clerkId === userId && (
          <DropdownMenuItem onClick={() => remove.mutate({ id: comment.id })}>
            <Trash2Icon className="size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default CommentDropDown