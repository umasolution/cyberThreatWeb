#!/bin/bash

# Require to install gsutils
# sudo apt-get install apt-transport-https ca-certificates gnupg -y
# echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
# curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
# sudo apt-get update
# sudo apt-get install google-cloud-cli -y
# sudo gcloud auth activate-service-account --key-file elated-channel-341618-c56acfab2cf3.json


var1=$1
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
date_now=$(date "+%F-%H-%M-%S")
tar -cvf /tmp/niahweb_$date_now.tar build
tar -cvf /tmp/niahweb_latest.tar build
