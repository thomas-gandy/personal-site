FROM node:23.11 AS base

WORKDIR /app/site
COPY package.json package-lock.json ./
RUN npm install
COPY . .


FROM base AS test
ENTRYPOINT ["npm", "run", "test"]


FROM base AS prod

RUN npm run build
ENTRYPOINT ["npm", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]


FROM base AS dev
ENTRYPOINT ["npm", "run", "dev", "--", "-p", "3000", "-H", "0.0.0.0"]
