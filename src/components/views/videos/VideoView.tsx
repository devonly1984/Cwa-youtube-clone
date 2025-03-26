import VideoViewsSection from "@/components/sections/videos/VideoViewsSection";
import SuggestionSection from "@/components/subsections/videos/SuggestionSection";

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
        </div>
      </div>
    </div>
  );
}
export default VideoView