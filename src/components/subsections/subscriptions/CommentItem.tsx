import UserAvatar from "@/components/sections/users/UserAvatar";
import { CommentsGetManyOutput } from "@/types";
import Link from "next/link";

interface CommentItemProps {
  comment: CommentsGetManyOutput[number];
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
      </div>
    </div>
  );
}
export default CommentItem