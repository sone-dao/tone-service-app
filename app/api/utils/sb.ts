import { createClient } from '@supabase/supabase-js'

export const sb = createClient(
  process.env.SB_URL as string,
  process.env.SB_KEY as string
)
