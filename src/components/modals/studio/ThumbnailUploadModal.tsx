import ResponsiveDialog from "@/components/shared/ResponsiveDialog"
import { UploadDropzone } from "@/lib/utils";
import { trpc } from "@/trpc/client";
interface ThumbnailUploadModalProps {
    videoId:string;
    open:boolean;
    onOpenChange:(open:boolean)=>void;
}
const ThumbnailUploadModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailUploadModalProps) => {
  const utils = trpc.useUtils();
  const onUploadComplete = ()=>{
    
    utils.studio.getOne.invalidate({ id: videoId });
    utils.studio.getMany.invalidate();
    onOpenChange(false);
  }
  return (
    <ResponsiveDialog
      title="Upload a Thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
      />
    </ResponsiveDialog>
  );
};
export default ThumbnailUploadModal
