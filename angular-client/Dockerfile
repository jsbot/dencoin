# Create image based on the official Node 6 image from dockerhub
FROM node:6


#WORKDIR /app

#COPY . .


WORKDIR /src
ADD package.json /src/
ADD angular-cli.json /src/
ADD karma.conf.js /src/
ADD protractor.conf.js /src/
ADD tsconfig.json /src/
ADD tslint.json /src/
RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
