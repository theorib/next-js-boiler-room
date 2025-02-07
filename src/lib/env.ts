import { z } from 'zod'

import { createEnv } from '@t3-oss/env-nextjs'

export const env = createEnv({
  server: {
    PRIVATE_ENV_NAME: z.string(),
  },

  client: {
    NEXT_PUBLIC_ENV_NAME: z.string(),
  },

  runtimeEnv: {
    PRIVATE_ENV_NAME: process.env.PRIVATE_ENV_NAME,
    NEXT_PUBLIC_ENV_NAME: process.env.NEXT_PUBLIC_ENV_NAME,
  },

  emptyStringAsUndefined: true,
})

export default env
