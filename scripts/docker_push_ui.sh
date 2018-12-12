#!/bin/bash

GIT_COMMIT=$1
docker push mattiskj/hgop:ui$GIT_COMMIT || exit 1