#!/bin/bash

BRANCH_NAME=$1
INPUTS_MAIN_BRANCH_NAME=$2
INPUTS_ERROR_ON_NO_SUCCESSFUL_WORKFLOW=$3

if [ "$BRANCH_NAME" != $INPUTS_MAIN_BRANCH_NAME ]; then
    BASE_SHA=$(echo $(git merge-base origin/$INPUTS_MAIN_BRANCH_NAME HEAD))
    echo ""
    echo "Branch found. Using base from 'origin/$INPUTS_MAIN_BRANCH_NAME': $BASE_SHA"
    echo ""
else
    # For the base SHA for main builds we use the latest matching tag as a marker for the last commit which was successfully built.
    # We use 2> /dev/null to swallow any direct errors from the command itself so we can provide more useful messaging
    # SHA=$(git describe --tags --abbrev=0 --match="$INPUTS_TAG_MATCH_PATTERN" 2> /dev/null)
    SHA=$(node scripts/find-successful-workflow.js $INPUTS_MAIN_BRANCH_NAME )

    if [ -z $SHA ]; then
        if [ $INPUTS_ERROR_ON_NO_SUCCESSFUL_WORKFLOW = "true" ]; then
            echo ""
            echo "ERROR: Unable to find a successful workflow run on 'origin/$INPUTS_MAIN_BRANCH_NAME'"
            echo ""
            echo "NOTE: You have set 'error-on-no-successful-workflow' on the action so this is a hard error."
            echo ""
            echo "Is it possible that you have no runs currently on 'origin/$INPUTS_MAIN_BRANCH_NAME' in your repo?"
            echo ""
            echo "- If yes, then you should run the workflow without this flag first."
            echo "- If no, then you might have changed your git history and those commits no longer exist."
            echo ""

            exit 1
        else
            echo ""
            echo "WARNING: Unable to find a successful workflow run on 'origin/$INPUTS_MAIN_BRANCH_NAME'"
            echo ""
            echo "We are therefore defaulting to use HEAD~1 on 'origin/$INPUTS_MAIN_BRANCH_NAME'"
            echo ""
            echo "NOTE: You can instead make this a hard error by settting 'error-on-no-successful-workflow' on the action in your workflow."
            echo ""

            SHA="HEAD~1"
        fi
    else
        echo ""
        echo "Commit found for the last successful workflow run on 'origin/$INPUTS_MAIN_BRANCH_NAME'"
        echo ""
        echo "Commit found: $SHA"
        echo ""
    fi

    BASE_SHA=$(echo $(git rev-parse $SHA~0))
fi

HEAD_SHA=$(git rev-parse HEAD)
