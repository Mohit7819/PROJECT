FROM node:18-alpine

WORKDIR /app

# copy package.json first to leverage caching
COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
