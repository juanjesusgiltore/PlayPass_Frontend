FROM node:20 AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias (generando binarios nativos correctos para Linux)
RUN npm install

# Copiar el resto del código
COPY . .

RUN npm run build -- --configuration production

# Etapa 2: Servidor Apache
FROM httpd:2.4

# Limpia el contenido anterior
RUN rm -rf /usr/local/apache2/htdocs/*

# Copia los archivos generados por Angular
COPY --from=builder /app/dist/play-pass-fronted/browser /usr/local/apache2/htdocs/

COPY my-httpd.conf /usr/local/apache2/conf/extra/my-httpd.conf

RUN echo "Include conf/extra/my-httpd.conf" >> /usr/local/apache2/conf/httpd.conf

# Copia el .htaccess necesario para SPA
COPY .htaccess /usr/local/apache2/htdocs/
