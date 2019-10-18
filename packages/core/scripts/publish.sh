#!/bin/bash
set -eo pipefail

PACKAGE_NAME=$1

echo "1 = '$1'"
echo "1 = '$2'"

# set up .npmrc to authenticate with the provided token
echo "Seting up .npmrc ..."
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

if [ -z "$2" ]; then
  echo "Publishing 'latest' to NPM...";
  npm publish ${PACKAGE_NAME} --access public
else
  echo "Publishing 'prerelease' to NPM...";
  npm publish ${PACKAGE_NAME} --tag=beta --access public
fi
