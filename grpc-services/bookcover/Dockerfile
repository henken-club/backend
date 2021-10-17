# whole dependencies
FROM node:16.4.2-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# production only dependencies
FROM deps AS deps-production
WORKDIR /app

RUN npm prune --production

# builder
FROM deps AS builder
WORKDIR /app

COPY scripts/protogen ./scripts/protogen
COPY proto ./proto
RUN npm run protogen

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# runner
FROM node:16.4.2-alpine AS runner
WORKDIR /app

ENV PORT 5000
ENV NODE_ENV production

COPY --from=deps-production /app/package.json ./package.json
COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
