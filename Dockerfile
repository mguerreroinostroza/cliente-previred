# Usa una imagen base de Node.js para compilar la app
FROM node:18-alpine AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Compila la aplicación
RUN npm run build

# Usa una imagen de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos de la build al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]