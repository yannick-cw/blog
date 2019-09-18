#!/bin/sh

#define parameters which are passed in.
TITLE=$1
date=`date +"%Y-%m-%d"`
filename=${TITLE// /_}

cd /Users/yannick/otherworkspace/blog
echo "
---
title: '$TITLE'
date: '$date'
tags: []
---
" >> src/blog-posts/$filename.md
nvim src/blog-posts/$filename.md
