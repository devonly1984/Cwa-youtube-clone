"use client";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import { PlusIcon } from "lucide-react";

const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: ()=>{
      utils.studio.getMany.invalidate();
    }
  });
  return (
    <Button variant={"secondary"} onClick={() => create.mutate()}>
      <PlusIcon />
      Create
    </Button>
  );
};
export default StudioUploadModal;
