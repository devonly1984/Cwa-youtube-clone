"use client";
import ResponsiveDialog from "@/components/shared/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { toast } from "sonner";
import StudioUploader from "../uploaders/StudioUploader";

const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: ()=>{
      toast.success("Video created")
      utils.studio.getMany.invalidate();
    },
    onError:(error)=>{
      toast.error(error.message);
    }
  });
  return (
    <>
      <ResponsiveDialog
        title="Upload a Video"
        open={!!create.data?.url}
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={() => {}} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveDialog>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  );
};
export default StudioUploadModal;
