import { categoriesRouter } from '../categories/server/procedures';
import {  createTRPCRouter } from '../init';
import { studioRouter } from '../studio/server/procedures';
import { videoViewsRouter } from '../video-views/server/procedures';
import { videosRouter } from '../videos/procedures';

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
  videoViews: videoViewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;