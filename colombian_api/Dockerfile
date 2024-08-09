# Stage 1 : Build
FROM node:lts-bullseye AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --no-cache

COPY . .

RUN npm run build --prod

# Stage 2: ExposeApp
FROM nginx:1-alpine-slim
ADD ./config/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build/ /var/www/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
