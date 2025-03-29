import { Skeleton } from "../ui/skeleton";
const VideoTopRowSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-4/5 md:w-2/5" />
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 w-[70%]">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-5 w-4/5 md:w-2/6" />
            <Skeleton className="h-5 w--3/5 md:1/5" />
          </div>
        </div>
        <Skeleton className="h-9 w-2/6 md:1/6 rounded-full" />
      </div>
      <div className="h-[120px] w-full" />
    </div>
  );
};
export default VideoTopRowSkeleton;
