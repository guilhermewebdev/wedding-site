#!/bin/sh
rm -rf .next
rm tsconfig.tsbuildinfo
yarn install
$@