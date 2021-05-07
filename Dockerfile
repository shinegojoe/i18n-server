
FROM ubuntu:18.04

# Set the working directory to /app
WORKDIR /app

# Install any needed packages specified in requirements.txt
COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
COPY development.env ./
COPY production.env ./

RUN apt update
RUN apt install curl -y
RUN curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
RUN apt install vim
RUN apt-get install build-essential
RUN npm install pm2 -g
RUN npm install

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable


# Run app.py when the container launches
# CMD ["python3 main.py"]
# CMD ["npm install", "npm run b2"]

