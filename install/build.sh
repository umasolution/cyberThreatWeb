#!/bin/bash

echo "building started"

COMMIT=`git log --format="%H" -n 1`
DATE=$(date '+%Y-%m-%d')

BUILD_NAME=niah-web-$COMMIT-$DATE.deb
BUILD_DIR=niah-web-$1
var1=$2
echo $BUILD_DIR

mkdir $BUILD_DIR

mkdir $BUILD_DIR/usr/
mkdir $BUILD_DIR/usr/share
mkdir $BUILD_DIR/usr/share/niah-web/
mkdir $BUILD_DIR/usr/share/niah-web/src

echo "build niwhweb nodejs"
sed -i "s/niahsecurity.online/$var1/g" src/config.json
sed -i "s/Niahsecurity.online/$var1/g" src/config.json
sed -i "s/niahsecurity.online/$var1/g" src/index.js
sed -i "s/Niahsecurity.online/$var1/g" src/index.js
sed -i "s/niahsecurity.online/$var1/g" src/views/Integrations/Project/ProjectListModal.js
sed -i "s/niahsecurity.online/$var1/g" src/views/Integrations/IntegrationModal.js
sed -i "s/niahsecurity.online/$var1/g" src/saga/pollingSaga.js
sudo apt-get install curl -y
curl -sL https://deb.nodesource.com/setup_17.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get install -y nodejs
sudo apt install -y build-essential
export NODE_OPTIONS=--openssl-legacy-provider
CI=false npm run build


echo "package building started"

cp -r install/DEBIAN $BUILD_DIR/
cp install/nginx.conf $BUILD_DIR/usr/share/niah-web/
cp install/default $BUILD_DIR/usr/share/niah-web/
cp -r build/* $BUILD_DIR/usr/share/niah-web/src

echo "package building completed"

echo "started deb package creation"
dpkg-deb --build $BUILD_DIR $BUILD_NAME

mkdir /var/www/html/build/niah-web/$1/$DATE

cp $BUILD_NAME /var/www/html/build/niah-web/$1/$DATE

