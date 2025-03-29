import CommentDropDown from "@/components/menus/comments/CommentDropDown";
import UserAvatar from "@/components/sections/users/UserAvatar";
import { CommentsGetManyOutput } from "@/types";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface CommentItemProps {
  comment: CommentsGetManyOutput["items"][number];
}
const CommentItem = ({comment}:CommentItemProps) => {

  return (
    <div>
      <div className="flex gap-4">
        <Link href={`/users/${comment.userId}`}>
          <UserAvatar
            size={"lg"}
            imageUrl={comment.user.imageUrl}
            name={comment.user.name}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link href={`/users/${comment.userId}`}>
            <div className="flex items-center ap-2 mb-0.5">
              <span className="font-medium text-sm pb-0.5">
                {comment.user.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
            </div>
          </Link>
          <p className="text-sm">{comment.value}</p>
          {/**TODO: REACTIONS */}
        </div>
      <CommentDropDown comment={comment}/>
      </div >
    </div>
  );
}
export default CommentItem