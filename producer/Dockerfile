FROM node:14

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY package-lock.json ./

COPY ./ ./
RUN npm install -g typescript
RUN npm install -g ts-node

RUN npm i
EXPOSE 4800/tcp
CMD ["npm", "run", "prod"]

