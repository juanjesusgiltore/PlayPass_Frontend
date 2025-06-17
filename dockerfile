FROM node:20 AS builder

WORKDIR /app
COPY ./PlayPass_Frontend ./

RUN npm install && npm run build --prod

# Stage 2: Apache para servir Angular
FROM httpd:2.4

COPY --from=builder /app/dist/mi-app/ /usr/local/apache2/htdocs/