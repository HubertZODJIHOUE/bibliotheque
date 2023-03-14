# Utilisez l'image node 14 comme base
FROM node:latest as node

# Créez un répertoire de travail
WORKDIR /app

# Copiez le fichier package.json et le fichier package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm --force install

# Copiez tout le contenu de votre projet dans le répertoire de travail
COPY . .

# Construisez le projet Angular
RUN npm run build

# Utilisez l'image nginx comme base
FROM nginx:alpine

# Copiez le contenu de la compilation Angular dans le répertoire de travail de Nginx
COPY --from=node /app/dist/* /usr/share/nginx/html/

# Exposez le port 80
EXPOSE 80

# Démarrez le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]
