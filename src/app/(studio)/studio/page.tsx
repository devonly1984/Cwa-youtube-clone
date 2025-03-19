import StudioView from "@/components/studio/views/StudioView";
import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";

const StudioPage =async () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
  });
  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};
export default StudioPage;
