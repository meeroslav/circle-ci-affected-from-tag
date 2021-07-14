#!/bin/bash

echo "First $1"
echo "Second $2"
echo "Third $3"
echo "Fourth $4"

INPUTS_MAIN_BRANCH_NAME=$4
PROJECT_SLUG="$1/$2/$3"
echo "$PROJECT_SLUG"

SHA=$(node scripts/find-successful-workflow.js $INPUTS_MAIN_BRANCH_NAME $PROJECT_SLUG)

echo "$SHA"
