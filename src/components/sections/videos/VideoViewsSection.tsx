"use client"
import VideoPlayer from "@/components/shared/VideoPlayer"
import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import VideoBanner from "./VideoBanner"
import VideoTopRow from "./VideoTopRow"

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
    const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId });
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
          onPlay={() => {}}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={video.muxStatus} />
      <VideoTopRow video={video}/>
    </>
  );
};
export default VideoViewsSection