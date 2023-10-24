#!/bin/bash

APP_NAME=fable-frame

docker build -t megastruktur/$APP_NAME -t megastruktur/$APP_NAME:$(node -e "console.log(require('./package.json').version)") .
