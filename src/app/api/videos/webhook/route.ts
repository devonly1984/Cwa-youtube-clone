import {eq} from 'drizzle-orm'
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetDeletedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent,
} from "@mux/mux-node/resources/webhooks";
import { headers } from 'next/headers';
import {mux} from '@/lib/mux'
import { videos } from '@/db/schema';
import db from '@/db';
const SIGNING_SECRET = process.env.MUX_SIGNING_SECRET;
type WebhookEvent =
  | VideoAssetCreatedWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetTrackReadyWebhookEvent
  | VideoAssetDeletedWebhookEvent;

const POST = async(request:Request)=>{
    if (!SIGNING_SECRET) {
        throw new Error("MUX_SIGNING_SECRET is not set")
    }
    const headersPayload = await headers();
    const muxSignature = headersPayload.get('mux-signature')
    if (!muxSignature) {
        return new Response("No Signature found",{status: 401})
    }
    const payload = await request.json();
    const body = JSON.stringify(payload);
    mux.webhooks.verifySignature(
      body,
      {
        "mux-signature": muxSignature,
      },
      SIGNING_SECRET
    );
    let data;
    switch (payload.type as WebhookEvent["type"]) {
      case "video.asset.created": {
         data = payload.data as VideoAssetCreatedWebhookEvent["data"];
        if (!data.upload_id) {
          return new Response("No upload ID found", { status: 400 });
        }
        await db
          .update(videos)
          .set({
            muxAssetId: data.id,
            muxStatus: data.status,
          })
          .where(eq(videos.muxUploadId, data.upload_id));
        break;
      }
      case 'video.asset.ready' :{
        data = payload.data as VideoAssetReadyWebhookEvent['data'];
        const playbackId = data.playback_ids?.[0]?.id;
        if (!data.upload_id) {
          return new Response("No upload ID found", { status: 400 });
        }
        if (!playbackId) {
          return new Response("Missing playback ID", { status: 400 });

        }
        const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
        const previewUrl = `https://image.mux.com/${playbackId}/animated.gif`
        const duration = data.duration? Math.round(data.duration*1000): 0
        await db
          .update(videos)
          .set({
            muxStatus: data.status,
            muxPlaybackId: playbackId,
            muxAssetId: data.id,
            thumbnailUrl,
            previewUrl,
            duration,
          })
          .where(eq(videos.muxUploadId, data.upload_id));
        break;
      }
      case 'video.asset.errored': {
        data = payload.data as VideoAssetErroredWebhookEvent['data'];
        if (!data.upload_id) {
          return new Response("No upload ID found", { status: 400 });
        }
        await db
          .update(videos)
          .set({
            muxStatus: data.status,
          })
          .where(eq(videos.muxUploadId, data.upload_id));
        break;
      }
      case 'video.asset.deleted': {
        data = payload.data as VideoAssetDeletedWebhookEvent["data"];
        if (!data.upload_id) {
          return new Response("No upload ID found", { status: 400 });
        }
        await db.delete(videos).where(eq(videos.muxUploadId, data.upload_id));
        break;
      }
      case 'video.asset.track.ready': {
        data = payload.data as VideoAssetTrackReadyWebhookEvent["data"] & {
          asset_id: string;
        };
        const assetId = data.asset_id;
        const trackId = data.id;
        const status = data.status;
        if (!assetId) {
          return new Response("Missing asset ID", { status: 400 });
        }
        await db
          .update(videos)
          .set({
            muxTrackId: trackId,
            muxTrackStatus: status,
          })
          .where(eq(videos.muxAssetId, assetId));

        break;
      }
      default:
        break;
    }
}


export default POST;