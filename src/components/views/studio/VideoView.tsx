import VideoForm from "@/components/forms/videos/VideoForm";

interface VideoViewProps {
    videoId:string;
}
const VideoView = ({ videoId }: VideoViewProps) => {
  return (
    <div className="px-4 max-w-screen-lg pt-2.5">
      <VideoForm videoId={videoId} />
    </div>
  );
}

export default VideoView