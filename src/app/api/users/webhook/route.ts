import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import db from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { config } from '@/lib/config'

export async function POST(req: Request) {
  const WH_SIGNING_SECRET = config.clerk.wehook.signingSecret

  if (!WH_SIGNING_SECRET) {
    throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(WH_SIGNING_SECRET)

  // Get headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    })
  }

  // Get body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error: Could not verify webhook:', err)
    return new Response('Error: Verification error', {
      status: 400,
    })
  }

  // Do something with payload
  // For this guide, log payload to console
  
  const eventType = evt.type
  //console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
  console.log('Webhook payload:', body)
  let data;

if (eventType === 'user.created') {  
  data=evt.data;
  await db.insert(users).values({
    clerkId: data.id,
    name: `${data.first_name} ${data.last_name}`,
    imageUrl: data.image_url,
  });
}
if (eventType === 'user.deleted') {
  data = evt.data;
  if (!data.id) {
    return new Response("missing user id", { status: 400 });
  }
  await db.delete(users).where(eq(users.clerkId,data.id))
}
if (eventType === 'user.updated'){
  data = evt.data
  await db
    .update(users)
    .set({
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    })
    .where(eq(users.clerkId, data.id));
}
  return new Response('Webhook received', { status: 200 })
}