#!/bin/bash

cd $KOVADOM_HOME
scp -P 2244 target/kovadom-0.0.1-SNAPSHOT.war root@vps326792.ovh.net:/tmp
ssh -p 2244 root@vps326792.ovh.net  << EOF
cd /opt/tomcat/webapps
../bin/shutdown.sh
sleep 15
cp ROOT ROOT_OLD
rm -rf ROOT
rm -rf ROOT.war
cp /tmp/kovadom-*.war ROOT.war
../bin/startup.sh
rm -rf /tmp kovadom-*.war
EOF
