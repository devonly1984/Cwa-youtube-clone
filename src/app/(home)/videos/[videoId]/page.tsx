import VideosView from "@/components/views/videos/VideoView";
import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

interface VideoPageProps {
    params: Promise<{videoId:string}>;
}
const VideoPage = async({params}:VideoPageProps) => {
  const { videoId } = await params;
  void trpc.videos.getOne.prefetch({ id: videoId });

  void trpc.comments.getMany.prefetchInfinite({ videoId,limit:DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <VideosView videoId={videoId} />
    </HydrateClient>
  );
};
export default VideoPage;
