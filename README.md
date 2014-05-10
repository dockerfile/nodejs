## Node.js Dockerfile


This repository contains **Dockerfile** of [Node.js](http://nodejs.org/) for [Docker](https://www.docker.io/)'s [trusted build](https://index.docker.io/u/dockerfile/nodejs/) published to the public [Docker Registry](https://index.docker.io/).


### Dependencies

* [dockerfile/ubuntu](http://dockerfile.github.io/#/ubuntu)


### Installation

1. Install [Docker](https://www.docker.io/).

2. Download [trusted build](https://index.docker.io/u/dockerfile/nodejs/) from public [Docker Registry](https://index.docker.io/): `docker pull dockerfile/nodejs`

   (alternatively, you can build an image from Dockerfile: `docker build -t="dockerfile/nodejs" github.com/dockerfile/nodejs`)


### Usage

    docker run -it --rm dockerfile/nodejs

#### Run `node`

    docker run -it --rm dockerfile/nodejs node

#### Run `npm`

    docker run -it --rm dockerfile/nodejs npm
