#!/bin/bash

GITHUB_EVENT_NAME=$1
INPUTS_MAIN_BRANCH_NAME=$2
INPUTS_ERROR_ON_NO_SUCCESSFUL_WORKFLOW=$3

echo "THIS IS WHAT I GOT: $GITHUB_EVENT_NAME $INPUTS_MAIN_BRANCH_NAME $INPUTS_ERROR_ON_NO_SUCCESSFUL_WORKFLOW"
