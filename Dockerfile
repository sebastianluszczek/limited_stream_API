FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]