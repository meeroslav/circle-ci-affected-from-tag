#!/bin/bash

TAG=$(git describe --tags --abbrev=0 --match="nx_successful_ci_run__*" 2> /dev/null)

if [ -z $TAG ]; then
    echo ""
    echo "WARNING: Unable to resolve a latest matching tag"
    echo "We are therefore defaulting to use HEAD~1"
    echo ""

    TAG="HEAD~1"
else
    echo ""
    echo "Successfully found a matching tag: $TAG"
    echo ""
fi

BASE_SHA=$(echo $(git rev-parse $TAG~0))
