FROM node

WORKDIR /app/customer-service

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "start"]