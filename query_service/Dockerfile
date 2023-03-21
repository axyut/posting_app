#specify base image
FROM node:alpine    

#set working directory to '/app' in the container
WORKDIR /app       

#copy over only package.json file
COPY package.json ./   

#install required dependencies
RUN npm install        

#copy over all of our source code
COPY ./ ./             

#set the command to run when container starts up
CMD ["npm", "start"]  