#!/bin/bash

set -e

echo ">> Cleaning up..."
rm -rf dist

echo ">> Building a package..."
npm run build

echo ">> Cleaning up a package.json file..."
npm run clean-package-json

echo "Package is ready to publish"