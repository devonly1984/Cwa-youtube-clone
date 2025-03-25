import VideoView from "@/components/views/videos/VideoView";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";
interface PageProps {
  params: Promise<{ videoId: string }>;
}
const VideoIdPage = async ({ params }: PageProps) => {
  const { videoId } = await params;
  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};
export default VideoIdPage;
