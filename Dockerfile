#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

# Pull base image.
FROM dockerfile/ubuntu

# Install Node.js
RUN add-apt-repository -y ppa:chris-lea/node.js
RUN apt-get update
RUN apt-get install -y nodejs

# Turn this container into an executable.
ENTRYPOINT ["node"]
CMD ["-h"]
