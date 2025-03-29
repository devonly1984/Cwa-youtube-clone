import VideosView from "@/components/views/videos/VideoView";
import { HydrateClient, trpc } from "@/trpc/server";

interface VideoPageProps {
    params: Promise<{videoId:string}>;
}
const VideoPage = async({params}:VideoPageProps) => {
  const { videoId } = await params;
  void trpc.videos.getOne.prefetch({ id: videoId });
  //TODO: change to prefetch Infinite
  void trpc.comments.getMany.prefetch({ videoId });
  return (
    <HydrateClient>
      <VideosView videoId={videoId} />
    </HydrateClient>
  );
};
export default VideoPage;
