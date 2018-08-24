#/bin/bash

if [ ! -d node_modules ]; then
	echo "installing modules"
	npm i
fi
if ! [ $(id -u) = 0 ]; then
   echo "you must run this script as root"
   exit 1
fi
chmod +x ./daemon/daemon.js
chmod -R 777 .
mkdir -p /etc/saintmotelivisord
cp -r . /etc/saintmotelivisord

cp ./daemon/saintmotelivisord.service /etc/systemd/system
systemctl start saintmotelivisord
systemctl enable saintmotelivisord