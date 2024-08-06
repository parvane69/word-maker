FROM node:16-alpine

WORKDIR /src

COPY package*.json ./



RUN npm install --force

COPY . .
RUN npm run build
EXPOSE 3002

CMD [ "npm", "run", "start:prod" ]
