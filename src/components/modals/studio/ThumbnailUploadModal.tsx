import ResponsiveDialog from "@/components/shared/ResponsiveDialog"
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
  return <div>ThumbnailUploadModal</div>;
};
export default ThumbnailUploadModal
