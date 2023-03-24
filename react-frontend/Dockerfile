#specify base image
FROM node:alpine    

ENV CI=true

#set working directory to '/app' in the container
WORKDIR /app       

#copy over only package.json file
COPY package.json ./   

#install required dependencies
RUN npm install        

#copy over all of our source code
COPY ./ ./             

# Expose port for docker to let kuberrnetes lnow
EXPOSE 3003

#set the command to run when container starts up
CMD ["npm", "start"]  