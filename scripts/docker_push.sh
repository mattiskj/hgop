#!/bin/bash

GIT_COMMIT=$1

docker push mattiskj/hgop:$GIT_COMMIT || exit 1


# TODO exit on error if any command fails