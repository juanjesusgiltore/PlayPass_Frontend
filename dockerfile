FROM node:20 AS builder

WORKDIR /app
COPY ./ ./

RUN npm install && npm run build --prod

# Stage 2: Apache para servir Angular
FROM httpd:2.4

COPY --from=builder /app/dist/*/ /usr/local/apache2/htdocs/
