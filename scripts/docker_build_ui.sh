#!/bin/bash

GIT_COMMIT=$1
cd game-client
docker build -t mattiskj/hgop:ui$GIT_COMMIT . || exit 1