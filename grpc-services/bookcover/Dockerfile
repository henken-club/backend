# whole dependencies
FROM node:16.4.2-slim AS deps
WORKDIR /app

COPY package.json yarn.lock ./
COPY external ./external

RUN yarn install --frozen-lockfile && yarn cache clean

# production only dependencies
FROM deps AS deps-production
WORKDIR /app

COPY package.json yarn.lock ./
COPY external ./external

RUN yarn install --frozen-lockfile --production && yarn cache clean

# builder
FROM deps AS builder
WORKDIR /app

COPY tsconfig.json ./
COPY src ./src
COPY scripts ./scripts

RUN yarn run generate && yarn run build

# runner
FROM node:16.4.2-slim AS runner
WORKDIR /app

ENV PORT 5000

COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
