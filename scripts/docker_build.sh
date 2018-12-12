#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t mattiskj/hgop:api$GIT_COMMIT . || exit 1

# TODO exit on error if any command fails