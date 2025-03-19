import { categoriesRouter } from '../categories/server/procedures';
import {  createTRPCRouter } from '../init';
import { studioRouter } from '../studio/server/procedures';
import { videosRouter } from '../videos/procedures';

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videosRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;