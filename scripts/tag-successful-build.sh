#!/bin/bash

command_string_to_echo_as_tag_name=$1
INPUTS_TAG_MATCH_PATTERN=$2

# remove all tags first
git tag -d $(git tag -l "$INPUTS_TAG_MATCH_PATTERN")
git tag $command_string_to_echo_as_tag_name
git push origin --tags
