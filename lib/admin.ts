import { headers } from "next/headers"
import { auth } from "@/lib/auth"

// Returns the signed-in admin user, or null. A user is an admin only if their
// email matches the ADMIN_EMAIL environment variable.
export async function getAdminUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user
  if (!user) return null

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (!adminEmail) return null
  if (user.email.trim().toLowerCase() !== adminEmail) return null

  return user
}
