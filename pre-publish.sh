#!/bin/bash

set -e

echo ">> Cleaning up..."
rm -rf dist

echo ">> Building a package..."
npm run build

echo ">> Cleaning up a package.json file..."
npx ts-node scripts/clean-package-json.js

echo "Package is ready to publish"