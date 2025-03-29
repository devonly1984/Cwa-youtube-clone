import VideoViewsSection from "@/components/sections/videos/VideoViewsSection";
import CommentsSection from "@/components/subsections/subscriptions/CommentsSection";
import SuggestionSection from "@/components/subsections/subscriptions/SuggestionSection";

interface VideosViewProps {
    videoId:string;
}
const VideoView = ({videoId}:VideosViewProps) => {
  return (
    <div className="flex flex-col max-w-[1700px] mx-auto px-4 pt-2.5 mb-10">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <VideoViewsSection videoId={videoId} />
          <div className="xl:hidden block mt-4">
            <SuggestionSection />
          </div>
          <CommentsSection videoId={videoId} />
        </div>
        <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
          <SuggestionSection />
        </div>
      </div>
    </div>
  );
}
export default VideoView