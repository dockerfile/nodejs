## Node.js Dockerfile


This repository contains **Dockerfile** of [Node.js](http://nodejs.org/) for [Docker](https://www.docker.com/)'s [automated build](https://registry.hub.docker.com/u/dockerfile/nodejs/) published to the public [Docker Hub Registry](https://registry.hub.docker.com/).


### Base Docker Image

* [dockerfile/python](http://dockerfile.github.io/#/python)


### Installation

1. Install [Docker](https://www.docker.com/).

2. Download [automated build](https://registry.hub.docker.com/u/dockerfile/nodejs/) from public [Docker Hub Registry](https://registry.hub.docker.com/): `docker pull dockerfile/nodejs`

   (alternatively, you can build an image from Dockerfile: `docker build -t="dockerfile/nodejs" github.com/dockerfile/nodejs`)


### Usage

    docker run -it --rm dockerfile/nodejs

#### Run `node`

    docker run -it --rm dockerfile/nodejs node

#### Run `npm`

    docker run -it --rm dockerfile/nodejs npm
