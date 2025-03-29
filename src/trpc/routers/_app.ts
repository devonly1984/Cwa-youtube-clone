import { categoriesRouter } from '../categories/server/procedures';
import { commentsRouter } from '../comments/server/procedures';
import {  createTRPCRouter } from '../init';
import { studioRouter } from '../studio/server/procedures';
import { subscriptionsRouter } from '../subscriptions/server/procedures';
import { videoViewsRouter } from '../video-views/server/procedures';
import { videosRouter } from '../videos/procedures';
import { videoReactionsRouter } from '../viewerReactions/server/procedures';

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
  videoReaction: videoReactionsRouter,
  subscriptions: subscriptionsRouter,
  comments: commentsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;