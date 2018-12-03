#!/bin/bash

GIT_COMMIT=$1

docker push mattiskj/hgop:$GIT_COMMIT

# TODO exit on error if any command fails