# Kovadom

## Installation

* Install java 8 SDK
* Install maven 3+
* Install Mysql 5+
* mvn clean compile tomee-embedded:run
* Connect to http://localhost:8080

## Useful commands

###Node installation + Angular + Java in development mode
mvn clean compile tomee-embedded:run -Ddev.static-dir=<path-to-static-dir>
### Angular + Java without node installation in development mode
mvn clean compile tomee-embedded:run -Dskip.npm -Ddev.static-dir=<path-to-static-dir>
### Only java in development mode
mvn compile war:war tomee-embedded:run -Dskip.npm -Dfrontend.skip -Ddev.static-dir=<path-to-static-dir>

