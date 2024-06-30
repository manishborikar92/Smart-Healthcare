#!/bin/bash

# Fetch all branches
git fetch origin

# List all remote branches
remote_branches=$(git branch -r | grep -v '\->' | awk -F'/' '{print $2}')

# Iterate through each branch and pull changes
for branch in $remote_branches; do
    git checkout -B $branch origin/$branch
done
