"use client"
import VideoPlayer from "@/components/shared/VideoPlayer"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import VideoBanner from "./VideoBanner"
import VideoTopRow from "./VideoTopRow"
import { useAuth } from "@clerk/nextjs"

interface VideoViewsSectionProps {
    videoId:string
}
const VideoViewsSection = ({videoId}:VideoViewsSectionProps) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideoViewsSuspense videoId={videoId}/>
      </ErrorBoundary>
    </Suspense>
  );
}
const VideoViewsSuspense = ({ videoId }: VideoViewsSectionProps) => {
  const {isSignedIn}   = useAuth()
  const utils = trpc.useUtils();
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
    const createView = trpc.videoViews.create.useMutation({
      onSuccess:()=>{
        utils.videos.getOne.invalidate({ id: videoId });

      }
    })
    const handlePlay = ()=>{
      if (!isSignedIn) return;

      createView.mutate({videoId})
    }
  return (
    <>
      <div
        className={cn(
          "aspect-video bg-black rounded-xl overflow-hidden relative",
          video.muxStatus !== "ready" && "rounded-b-none"
        )}
      >
        <VideoPlayer
          autoPlay
          onPlay={handlePlay}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video} />
    </>
  );
};
export default VideoViewsSection