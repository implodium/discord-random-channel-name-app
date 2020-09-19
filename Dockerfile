FROM node:10
WORKDIR /usr/src/app/
CMD ["node", "index.js"]
COPY package*.json ./
RUN npm install
COPY . .
