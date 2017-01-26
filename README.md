# Kovadom

## Installation

* Install java 8 SDK
* Install maven 3+
* Install Mysql 5+
* mvn clean compile tomee-embedded:run
* Connect to http://localhost:8080  or https://localhost:8443
* In m2/settings.xml

```
<profiles>
    <profile>
        <id>dev</id>

        <activation>
            <activeByDefault>false</activeByDefault>
		</activation>
		
		<properties>
		    <!-- Path to the keystore for SSL certificates -->
		    <dev.keystore.path>xxx</dev.keystore.path>
		    <!-- Password to the keystore for SSL certificates -->
			<dev.keystore.password>xxx</dev.keystore.password>
			<!-- CONFIDENTIAL for https only or NONE to allow http also -->
			<kovadom.ssl.transport-guarantee>NONE</kovadom.ssl.transport-guarantee>
			<!-- Path to the "data" resources directory -->
			<dev.static-dir>xxx</dev.static-dir>
		</properties>
	</profile>
</profiles>
```

## Useful commands

###Node installation + Angular + Java in development mode
mvn -Pdev clean compile
### Angular + Java without node installation in development mode
mvn -Pdev clean compile -Dskip.npm 
### Only java in development mode
mvn -Pdev compile war:war -Dskip.npm -Dfrontend.skip
### Run Tomcat
mvn cargo:run
### Produce a producuction ready war
mvn compile war:war

## To generate keystore and certificate

### Basic solution
```
keystore -genkey -alias tomcat -keyalg RSA
```

### Convert "pem" certificates into the keystore
```
openssl pkcs12 -export -in <cert.pem> -inkey <privkey.pem> -out keystore.p12 -name <kovadom> -CAfile <chain.pem> -caname <root>
keytool -importkeystore -deststorepass <password> -destkeypass <password> -destkeystore kovadom-keystore.jks -srckeystore keystore.p12 -srcstoretype PKCS12 -srcstorepass <p12 previous.password> -alias <kovadom>
```




