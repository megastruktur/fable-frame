#!/bin/bash
docker push megastruktur/fable-frame

LATEST_VERSION=$(node -e "console.log(require('./package.json').version)")
docker push megastruktur/fable-frame:$LATEST_VERSION
