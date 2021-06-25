#!/bin/bash

PIPELINE_ID=$1

git tag nx_successful_ci_run__$PIPELINE_ID
git push origin --tags
