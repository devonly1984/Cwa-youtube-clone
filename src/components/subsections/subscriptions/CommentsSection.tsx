"use client";

import CommentForm from "@/components/forms/comments/CommentForm";
import { trpc } from "@/trpc/client";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CommentItem from "./CommentItem";

const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  return (
    <Suspense fallback={<>Loading...</>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};
interface CommentsSectionProps {
  videoId:string;
}
const CommentsSectionSuspense = ({ videoId }: CommentsSectionProps) => {
  const [comments] = trpc.comments.getMany.useSuspenseQuery({ videoId });

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1>0 Comments</h1>
        <CommentForm videoId={videoId} />
        <div className="flex flex-col gap-4 mt-2">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommentsSection