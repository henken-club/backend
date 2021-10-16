# whole dependencies
FROM node:14.17.6-slim AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# production only dependencies
FROM node:14.17.6-slim AS deps-production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# builder
FROM deps AS builder
WORKDIR /app

COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
COPY scripts ./scripts
RUN yarn run generate && yarn run build

# runner
FROM node:14.17.6-slim AS runner
WORKDIR /app

ENV PORT 8000

COPY --from=deps-production /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE $PORT

CMD ["node", "dist/main.js"]
