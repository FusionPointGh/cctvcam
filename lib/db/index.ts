import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const getConnectionString = () => {
  const url = process.env.DATABASE_URL
  if (!url) return undefined

  // Add sslmode=verify-full to suppress pg-connection-string warning
  // while maintaining the current security behavior
  if (!url.includes("sslmode=")) {
    return `${url}${url.includes("?") ? "&" : "?"}sslmode=verify-full`
  }
  return url
}

export const pool = new Pool({
  connectionString: getConnectionString(),
})

export const db = drizzle(pool, { schema })
