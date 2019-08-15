FROM ruby:2.6

RUN apt-get update -qq && apt-get install -y build-essential
RUN URL='https://github.com/krallin/tini/releases/download/v0.17.0/tini_0.17.0-amd64.deb'; FILE=$(mktemp); curl -L "$URL" -o $FILE && dpkg -i $FILE; rm $FILE
ENTRYPOINT ["tini", "--"]

WORKDIR /usr/src/app
COPY Gemfile ./
COPY Gemfile.lock ./
RUN bundle install

RUN URL='https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz'; FILE=$(mktemp); curl -L "$URL" -o $FILE && tar -C /usr/local --strip-components 1 -xf $FILE; rm $FILE
RUN URL='https://yarnpkg.com/latest.tar.gz'; FILE=$(mktemp); curl -L "$URL" -o $FILE && tar -C /usr/local --strip-components 1 -xf $FILE; rm $FILE
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3001
CMD ["bash","-c","((bundle check >/dev/null 2>&1) || bundle install) && (($(($(ls -1 ./node_modules | wc -l) >= 10)) >/dev/null 2>&1) || yarn install) && rm -f tmp/pids/server.pid && bundle exec rails s -p 3000 -b '0.0.0.0'"]
