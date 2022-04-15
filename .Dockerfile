FROM node:13

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app/
COPY src ./src
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm install


EXPOSE 3000
CMD ["npm", "start"]
