# syntax=docker/dockerfile:1

# Pick a pnpm version once and reuse it
ARG PNPM_VERSION=9.12.0

############################
# 1) APP BUILD (Svelte/Vite)
############################
FROM node:22-alpine AS app-builder
ARG PNPM_VERSION
WORKDIR /app

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Install deps with proper Docker layer caching
# (copy only manifest files first)
COPY app/pnpm-lock.yaml app/package.json ./
# If you use a private registry, uncomment:
# COPY app/.npmrc ./

# Pre-fetch to warm the store, then install
RUN pnpm fetch
COPY app/ .
RUN pnpm install --frozen-lockfile
RUN pnpm build


#########################################
# 2) SERVER DEPS (production dependencies)
#########################################
FROM node:22-alpine AS server-deps
ARG PNPM_VERSION
WORKDIR /server

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

COPY server/pnpm-lock.yaml server/package.json ./
# COPY server/.npmrc ./

# Only production deps for the server runtime
RUN pnpm fetch --prod
RUN pnpm install --prod --frozen-lockfile


############################
# 3) RUNTIME (small & clean)
############################
FROM node:22-alpine
ARG PNPM_VERSION
ENV NODE_ENV=production
WORKDIR /server

# pnpm available for `pnpm start`
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# Bring in server runtime deps and files
COPY --from=server-deps /server/node_modules ./node_modules
COPY --from=server-deps /server/package.json ./package.json
COPY server/ ./

# Bring in the built client from the app stage
COPY --from=app-builder /app/build /app/build

EXPOSE 3000
USER node
CMD ["pnpm", "start"]
