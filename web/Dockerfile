# stage1 - build react app first 
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm i
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM node:14
COPY --from=build /app/build .
EXPOSE 3000
ENV PORT 3000
CMD ["npx", "http-server", "--proxy", "http://localhost:3000?" ,"."]
