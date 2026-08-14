// src/app/api/webhooks/clerk/route.ts

import { ADMIN_EMAILS } from "@/lib/admin-emails";
import prisma from "@/lib/prisam-client";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("[Clerk Webhook] Missing CLERK_WEBHOOK_SIGNING_SECRET");
    return new Response("Missing CLERK_WEBHOOK_SIGNING_SECRET", { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("[Clerk Webhook] Verification failed:", err);
    return new Response("Invalid webhook", { status: 400 });
  }

  const eventType = evt.type;

  try {
    switch (eventType) {
      // ─────────────────────────────────────────────
      // User created (first sign-up)
      // ─────────────────────────────────────────────
      case "user.created": {
        const data = evt.data;

        const email =
          data.email_addresses?.find((e) => e.id === data.primary_email_address_id)
            ?.email_address ??
          data.email_addresses?.[0]?.email_address ??
          null;

        // Skip if no email — avoids unique constraint crash
        if (!email) {
          console.warn("[Clerk Webhook] user.created without email, skipping:", data.id);
          break;
        }

        // Auto-promote to ADMIN if the email is in the allow-list
        const role: "USER" | "ADMIN" = ADMIN_EMAILS.includes(email.toLowerCase())
          ? "ADMIN"
          : "USER";

        await prisma.user.upsert({
          where: { clerkId: data.id },
          update: {
            // Keep in sync if the row already exists (rare race)
            firstName: data.first_name ?? null,
            lastName: data.last_name ?? null,
            email,
            imageUrl: data.image_url ?? null,
          },
          create: {
            clerkId: data.id,
            firstName: data.first_name ?? null,
            lastName: data.last_name ?? null,
            email,
            imageUrl: data.image_url ?? null,
            role,
          },
        });

        // Mirror role into Clerk publicMetadata so middleware can read it
        // straight from the session token, with no DB call needed.
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(data.id, {
            publicMetadata: { role },
          });
        } catch (metaErr) {
          console.error("[Clerk Webhook] Failed to sync metadata for", data.id, metaErr);
        }

        console.log("[Clerk Webhook] User created:", data.id, "role:", role);
        break;
      }

      // ─────────────────────────────────────────────
      // Profile updated (name, email, avatar…)
      // Does NOT touch lastLoginAt / lastSeenAt
      // ─────────────────────────────────────────────
      case "user.updated": {
        const data = evt.data;

        const email =
          data.email_addresses?.find((e) => e.id === data.primary_email_address_id)
            ?.email_address ??
          data.email_addresses?.[0]?.email_address ??
          null;

        await prisma.user.updateMany({
          where: { clerkId: data.id },
          data: {
            firstName: data.first_name ?? null,
            lastName: data.last_name ?? null,
            ...(email ? { email } : {}), // only update email if present
            imageUrl: data.image_url ?? null,
          },
        });

        console.log("[Clerk Webhook] User updated:", data.id);
        break;
      }

      // ─────────────────────────────────────────────
      // New session = actual login
      // ─────────────────────────────────────────────
      case "session.created": {
        const data = evt.data as { user_id: string };

        if (data.user_id) {
          await prisma.user.updateMany({
            where: { clerkId: data.user_id },
            data: {
              lastLoginAt: new Date(),
              lastSeenAt: new Date(),
            },
          });
          console.log("[Clerk Webhook] Login tracked:", data.user_id);
        }
        break;
      }

      // ─────────────────────────────────────────────
      // User deleted in Clerk
      // ─────────────────────────────────────────────
      case "user.deleted": {
        const data = evt.data;

        if (data.id) {
          await prisma.user.deleteMany({
            where: { clerkId: data.id },
          });
          console.log("[Clerk Webhook] User deleted:", data.id);
        }
        break;
      }

      default:
        // Intentionally ignore other events
        break;
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Clerk Webhook] Error:", error);
    return new Response("Webhook Error: " + (error as Error).message, {
      status: 500,
    });
  }
}
