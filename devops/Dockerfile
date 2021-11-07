#############
### build ###
#############

# base image
FROM node:12-alpine as build

# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY ./package.json package.json
RUN npm install -g @angular/cli@8.3.28 --no-progress --loglevel=error
RUN npm install --no-progress --loglevel=error

# add app
COPY ./ .
# generate build
ARG ANGULAR_ENV=qas
#RUN echo $ANGULAR_ENV
RUN ng build --configuration=$ANGULAR_ENV --outputPath=dist

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

RUN rm -rf /etc/nginx/nginx.conf

COPY ./devops/nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
