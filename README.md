# Hono RPC + OpenAPI + Cloudflare + Turbo

- Backend:
    - Use the API from the frontend
    - Visit the swagger UI: 
    - Visit the scalar UI: `/scalar`
- Frontend: bring your own frontend, or use a different template. Add `"@application-name/backend": "workspace:*" to your frontend `package.json`'s dependencies.
- Use hono client in the frontend:
```typescript
// Warning: use `import type`, rather than `import` to avoid accidentally importing backend packages that are transitively imported. This would cause the application to fail to start.
import type {AppType} from '@application-name/backend';
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')
const reply = await client.users[":id"].$get({param: {id: '123'}})
const data = await reply.json()
console.log({data})
```

## TODOs

- Use the new turborepo eslint setup: https://turbo.build/repo/docs/guides/tools/eslint
- Add drizzle support for Postgres (Neon) and SQLite (e.g. turso)
- Take more stuff from talkdash repo: https://github.com/ben-xD/talkdash

## Setup

- Replace all instances of `application-name` with your application name
- Install Node, preferably by installing and using `fnm`
- install pnpm: `npm install --global pnpm`
- [Install turbo](https://turbo.build/repo/docs/getting-started/installation), by running `pnpm install --global turbo`
- Optional: disable telemetry: `turbo telemetry disable`
- Install dependencies: pnpm install
- Start application locally: `cd backend` or `cd frontend`, and then run a command, e.g. `pnpm dev`. See each projects `package.json` for more commands.

## Notes

- **OpenAPI integration**: I previously used trpc-openapi, which was much easier to define routes, more similar to how FastAPI, a python backend framework works. With Hono's OpenAPI integration and even Fastify, there's more openapi config you need to specify. It does slow down smaller projects, but it does mean you are in full control of the API, instead it being implicit in the function definitions.
- `turbo.jsonc` is the file you should edit since you won't get any IDE warnings about comments being in a JSON file. It is just a symlink to `turbo.json`, which Turbo will read. Turbo also doesn't care about comments. 
- Cloudflare workers / wrangler / miniflare: It's annoying that sometimes the server will fail to start, and I get no errors anywhere.