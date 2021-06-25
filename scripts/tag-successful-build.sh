#!/bin/bash

WORKFLOW_ID=$2

git tag nx_successful_build__$WORKFLOW_ID
git push origin --tags
