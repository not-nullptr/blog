FROM oven/bun:latest AS builder

WORKDIR /app
COPY package.json bun.lockb ./

RUN bun install

COPY . .

RUN bun run build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]