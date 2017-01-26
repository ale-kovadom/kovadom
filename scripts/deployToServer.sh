#!/bin/bash

cd $KOVADOM_HOME
scp -P 2244 target/kovadom-0.0.1-SNAPSHOT.war root@vps326792.ovh.net:/tmp
ssh -T -p 2244 root@vps326792.ovh.net  << EOF
cd /opt/tomcat/webapps
../bin/shutdown.sh
sleep 2
exit
sleep 15
mv ../ROOT_OLD ../ROOT_TO_BE_REMOVED
cp -R ROOT ../ROOT_OLD
rm -rf ROOT
rm -rf ROOT.war
cp /tmp/kovadom-*.war ROOT.war
../bin/startup.sh
sleep 2
exit
rm -rf ../ROOT_TO_BE_REMOVED
rm -rf /tmp/kovadom-*.war
EOF
