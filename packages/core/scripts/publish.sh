#!/bin/bash
set -eo pipefail

# set up .npmrc to authenticate with the provided token
echo "Set up .npmrc ..."
echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc

# NOTE: auth is taken care of via AzDO `npm auth` task. ENV vars would work as well.
if [ -z "$1" ]; then
  echo "Publishing 'latest' to NPM...";
  npm publish $(System.ArtifactsDirectory)/core/paddleboard-core-1.0.0.tgz --access public
else
  echo "Publishing 'prerelease' to NPM...";
  npm publish $(System.ArtifactsDirectory)/core/paddleboard-core-1.0.0.tgz --tag=beta --access public
fi
