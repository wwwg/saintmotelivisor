#/bin/bash

if [ ! -d node_modules ]; then
	echo "installing modules"
	npm i
fi