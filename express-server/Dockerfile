 # Create image based on the official Node 6 image from the dockerhub
FROM node:6

WORKDIR /src
ADD package.json /src/
ADD .babelrc /src/
ADD .eslintrc.json /src/
ADD swagger.json /src/
RUN npm install nodemon -g
RUN npm install -g babel-cli
RUN npm i -g eslint
RUN npm i -g eslint-watch
RUN npm install



# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]