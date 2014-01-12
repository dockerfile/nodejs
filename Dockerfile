#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

# Pull base image.
FROM dockerfile/ubuntu

# Install Node.js
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Append to $PATH variable.
RUN echo '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bash_profile

# Define default command.
CMD ["node"]
