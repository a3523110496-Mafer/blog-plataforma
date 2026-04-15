# Imagen base
FROM node:18

# Carpeta raíz
WORKDIR /app

# Copiar package.json del backend
COPY backend/package*.json ./backend/

# Ir a backend
WORKDIR /app/backend

# Instalar dependencias
RUN npm install

# Regresar a raíz
WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Exponer puerto
EXPOSE 3000

# Ejecutar backend
CMD ["node", "backend/server.js"]