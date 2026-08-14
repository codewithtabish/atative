// // src/lib/user.ts
// import { clerkClient } from "@clerk/nextjs/server";
// import prisma from "./prisam-client";
// import { UserRole } from "@/generated/prisma/enums";

// /**
//  * Single source of truth for changing a user's role.
//  * Updates Postgres (source of truth) AND Clerk publicMetadata
//  * (fast-path read for middleware) together, so they never drift.
//  */
// export async function setUserRole(clerkId: string, role: UserRole) {
//   const user = await prisma.user.update({
//     where: { clerkId },
//     data: { role },
//   });

//   await clerkClient.users.updateUserMetadata(clerkId, {
//     publicMetadata: { role: user.role },
//   });

//   return user;
// }

// /**
//  * Creates the DB row for a new Clerk user and mirrors the
//  * default role into Clerk metadata. Call this from the
//  * user.created webhook.
//  */
