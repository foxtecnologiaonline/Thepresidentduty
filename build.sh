#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
dist_dir="$root_dir/dist"

rm -rf "$dist_dir"
mkdir -p "$dist_dir"

echo "==> Building v1.0"
(
  cd "$root_dir/apps/v1"
  npm ci
  VITE_STORAGE_NAMESPACE=presidencia-v1 npx vite build --base=/v1/ --outDir="$dist_dir/v1"
)

echo "==> Building v2.0"
(
  cd "$root_dir/apps/v2"
  npm ci
  VITE_STORAGE_NAMESPACE=presidencia-v2 npx vite build --base=/v2/ --outDir="$dist_dir/v2"
)

echo "==> Copying version picker"
cp "$root_dir/picker/index.html" "$dist_dir/index.html"
cp "$root_dir/picker/sw.js" "$dist_dir/sw.js"

echo "==> Combined build ready at $dist_dir"
