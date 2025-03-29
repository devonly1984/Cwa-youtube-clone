import db from "@/db";
import { videoReactions } from "@/db/schema";
import { createTRPCRouter,protectedProcedure } from "@/trpc/init";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export const videoReactionsRouter = createTRPCRouter({
  like: protectedProcedure.input(z.object({ videoId: z.string().uuid() })).mutation(async({ctx,input})=>{
    const {id:userId} = ctx.user;
    const {videoId} = input;
    const [existingRecordReactionLike] = await db
      .select()
      .from(videoReactions)
      .where(
        and(
          eq(videoReactions.videoId, videoId),
          eq(videoReactions.userId, userId),
          eq(videoReactions.type, "like")
        )
      );
      if (existingRecordReactionLike) {
        const [deletedViewerReactions] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.userId, userId),
              eq(videoReactions.videoId, videoId)
            )
          )
          .returning();
        return deletedViewerReactions;
      }
      const [createdRecordReaction] = await db
        .insert(videoReactions)
        .values({
          userId,
          videoId,
          type: "like",
        })
        .onConflictDoUpdate({
          target: [videoReactions.userId, videoReactions.videoId],
          set: {
            type: "like",
          },
        })
        .returning();
      return createdRecordReaction;
  }),
  dislike: protectedProcedure.input(z.object({ videoId: z.string().uuid() })).mutation(async({ctx,input})=>{
    const {id:userId} = ctx.user;
    const {videoId} = input;
    const [existingRecordReactionsDislike] = await db
      .select()
      .from(videoReactions)
      .where(
        and(
          eq(videoReactions.videoId, videoId),
          eq(videoReactions.userId, userId),
          eq(videoReactions.type, "dislike")
        )
      );
      if (existingRecordReactionsDislike) {
        const [deletedViewerReactions] = await db
          .delete(videoReactions)
          .where(
            and(
              eq(videoReactions.userId, userId),
              eq(videoReactions.videoId, videoId)
            )
          )
          .returning();
        return deletedViewerReactions;
      }
      const [createdRecordReaction] = await db
        .insert(videoReactions)
        .values({
          userId,
          videoId,
          type: "dislike",
        })
        .onConflictDoUpdate({
          target: [videoReactions.userId, videoReactions.videoId],
          set: {
            type: "dislike",
          },
        })
        .returning();
      return createdRecordReaction;
  }),
});