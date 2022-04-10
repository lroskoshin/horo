#!/bin/bash

set -e

echo ">> Cleaning up..."
rm -rf packages/core/dist

echo ">> Building a package..."
npm run build --workspace=@horo/core --workspace=@horo/state

echo ">> Cleaning up a package.json file..."
npm run clean-package-json --workspace=@horo/core --workspace=@horo/state

echo "Package is ready to publish"