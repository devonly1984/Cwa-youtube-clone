import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/trpc/routers/_app";

export type VideoGetOneOutput =
  inferRouterOutputs<AppRouter>["videos"]["getOne"];
export type CommentsGetManyOutput =
  inferRouterOutputs<AppRouter>["comments"]["getMany"];

  export type Comments =  {
    user: {
        id: string;
        clerkId: string;
        name: string;
        imageUrl: string;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    userId: string;
    videoId: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
}