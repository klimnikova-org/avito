FROM node:13

WORKDIR /usr/app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./src ./src
COPY tsconfig.build.json tsconfig.json ./

EXPOSE 3000
CMD ["npm", "start"]
