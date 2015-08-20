#
# Node.js Dockerfile
#
# https://github.com/dockerfile/nodejs
#

# Pull base image.
FROM ubuntu

# Install Node.js and change source to aliyun mirrors from taobao in China
RUN \
  cd /tmp && \
  wget http://npm.taobao.org/mirrors/node/node-latest.tar.gz && \
  tar xvzf node-latest.tar.gz && \
  rm -f node-latest.tar.gz && \
  cd node-v* && \
  ./configure && \
  CXX="g++ -Wno-unused-local-typedefs" make && \
  CXX="g++ -Wno-unused-local-typedefs" make install && \
  cd /tmp && \
  rm -rf /tmp/node-v* && \
  npm install -g npm && \
  printf '\n# Node.js\nexport PATH="node_modules/.bin:$PATH"' >> /root/.bashrc
  npm install -g cnpm --registry=https://registry.npm.taobao.org
  cnpm install -g express srails loopback mongodb mysql moogose
  
# Define working directory.
WORKDIR /data

# Define default command.
CMD ["bash"]
