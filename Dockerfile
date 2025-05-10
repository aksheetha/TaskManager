FROM node:18

WORKDIR /app

COPY . .

RUN npm install

ENV NODE_ENV=development

EXPOSE 19006

CMD ["npx", "expo", "start", "--web", "--non-interactive"]
