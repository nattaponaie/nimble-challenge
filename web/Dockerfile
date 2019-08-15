FROM node:10 as builder

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
RUN npm rebuild node-sass
COPY . .
RUN yarn build

FROM node:10 as web
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
EXPOSE 3000
CMD ["yarn", "start"]
