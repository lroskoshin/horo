#!/bin/bash

set -e

echo ">> Cleaning up..."
rm -rf packages/core/dist

echo ">> Building a package..."
npm run build --workspace=core

echo ">> Cleaning up a package.json file..."
npm run clean-package-json --workspace=core

echo "Package is ready to publish"