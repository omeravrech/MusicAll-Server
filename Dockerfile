FROM node
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV SERVER_PORT=80
ENV ENV_MODE="production"
ENV DB_SERVER_ADDR="localhost"
ENV DB_SERVER_PORT=27017
ENV DB_DATABASE_NAME="musicall"
ENV DB_USER_NAME="admin"
ENV DB_USER_PASS="admin"
EXPOSE 3000
ENTRYPOINT [ "node", "start" ]