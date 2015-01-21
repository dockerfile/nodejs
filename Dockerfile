#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

#MAINTAINER Fernando Mayo <fernando@tutum.co>, Feng Honglin <hfeng@tutum.co>

# Pull base image.
FROM dockerfile/ubuntu

# Select the version you want to use
# e.g.: latest, unstable, 0.11.12, 0.10.2, ..
ENV nodeVersion latest

#Suppress debian frontend errors
ENV DEBIAN_FRONTEND noninteractive

RUN \
  apt-get update && \
  apt-get install -y npm && \
  ln -sf /usr/bin/nodejs /usr/local/bin/node && \
  apt-get install -y curl && \
  rm -rf /var/lib/apt/lists/* && \
  npm install -g n && \
  n ${nodeVersion} && \
  echo -e '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["node", "-v"]
