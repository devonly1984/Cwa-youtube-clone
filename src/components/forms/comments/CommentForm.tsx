"use client"
import UserAvatar from "@/components/sections/users/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { USER_FALLBACK } from "@/constants";
import { useUser,useClerk } from "@clerk/nextjs";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {toast} from 'sonner';
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import { commentInsertSchema } from "@/db/schema";
import {Form,FormControl,FormField,FormItem, FormMessage} from '@/components/ui/form'
interface CommentFormProps {
    videoId:string;
    onSuccess?:()=>void;
}
const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
const {user} = useUser();
const clerk = useClerk()
const create = trpc.comments.create.useMutation({
    onSuccess: ()=>{
        utils.comments.getMany.invalidate({videoId});
        form.reset();
        toast.success("Comment added");
        onSuccess?.();
    },
    onError:(error)=>{
        toast.error("Something went wrong");
        if (error?.data?.code==='UNAUTHORIZED') {
            clerk.openSignIn();
        }
    }
})
const utils = trpc.useUtils();
const form = useForm<z.infer<typeof commentInsertSchema>>({
  resolver: zodResolver(commentInsertSchema),
  defaultValues: {
    videoId,
    value: "",
  },
});
const onSubmit = (values:z.infer<typeof commentInsertSchema>)=>{
create.mutate(values)
}
  return (
    <Form {...form}>
      <form className="flex gap-4 group" onSubmit={form.handleSubmit(onSubmit)}>
        <UserAvatar
          size={"lg"}
          imageUrl={user?.imageUrl || USER_FALLBACK}
          name={user?.username || "User"}
        />
        <div className="flex-1">
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Add a comment..."
                    className="resize-none bg-transparent overflow-hidden min-h-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="justify-end gap-2 mt-2 flex">
            <Button disabled={create.isPending} type="submit" size={"sm"}>
              Comment
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
export default CommentForm