#!/bin/bash
cd /home/kavia/workspace/code-generation/ecocraftify-65239-3d0d05c3/ecocraftify_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

