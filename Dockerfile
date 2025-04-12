FROM oven/bun:latest AS builder

WORKDIR /app

ARG PUB_PLAUSIBLE_URL

ENV PUB_PLAUSIBLEURL=${PUB_PLAUSIBLE_URL}

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:stable-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html
