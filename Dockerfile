FROM oven/bun:latest AS builder

WORKDIR /app
COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
