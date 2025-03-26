import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils"
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react"
//TODO Video Reactions
const VideoReactions = () => {
    const videoReaction: string = "like";
  return (
    <div className="flex items-center flex-none">
      <Button
        variant={"secondary"}
        className="rounded-l-full rounded-r-none gap-2 pr-4"
      >
        <ThumbsUpIcon
          className={cn("size-5", videoReaction === "like" && "fill-black")}
        />
        {1} Likes
      </Button>
      <Separator orientation="vertical" className="h-7" />
      <Button
        variant={"secondary"}
        className="rounded-l-none rounded-r-full  pl-3"
      >
        <ThumbsDownIcon
          className={cn("size-5", videoReaction !== "like" && "fill-black")}
        />
        {1} Dislikes
      </Button>
    </div>
  );
}
export default VideoReactions