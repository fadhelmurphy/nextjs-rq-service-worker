# 1. Install dependencies only when needed
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./ 
RUN yarn cache clean
RUN yarn install
# 2. Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environme
RUN yarn build
# 3. Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app
# You only need to copy next.config-js if you are NOT using the default con
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
# Automatically Leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["node", "server.js"]
# docker build --no-cache -t bvk/fe . --platform linux/amd64
# docker run -d -p 3000:3000 --name bvk-fe bvk/fe