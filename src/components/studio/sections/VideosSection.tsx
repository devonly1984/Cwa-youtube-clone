"use client";

import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

const VideosSection = () => {
    const [items, nextCursor] = trpc.studio.getMany.useSuspenseInfiniteQuery(
      {
        limit: DEFAULT_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );
  return <div>{JSON.stringify(items)}</div>;
};
export default VideosSection;
