FROM node:8
MAINTAINER Michelle Beard

RUN mkdir /code

# Add dependencies
ADD ./frontend /code
ADD ./frontend/.angular-cli.json /code
ADD ./frontend/package.json /code
ADD ./frontend/package-lock.json /code
ADD ./frontend/karma.conf.js /code
ADD ./frontend/tsconfig.json /code
ADD ./frontend/tslint.json /code

WORKDIR /code

RUN npm install

# Set the command to run on startup
CMD ["npm", "start"]
EXPOSE 4200
