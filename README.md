# hdap-ui

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Directory server setup

The app relies on a DS with the evaluation profile and an HTTPS connection handler listening at `https://localhost:8443`.
In the default password policy, turn off the requirement to authenticate over a secure connection.

For example:

```sh
unzip -q ~/.m2/repository/org/forgerock/opendj/opendj-server/7.5.0-SNAPSHOT/opendj-server-7.5.0-SNAPSHOT.zip

export DEPLOYMENT_ID=ADaMkVIXfryp4tZN3_0V4WoB3BZc9SQ5CBVN1bkVDE6OSY5Kl7pIibg

./opendj/setup \                                                                                    
 --serverId evaluation-only \
 --deploymentId $DEPLOYMENT_ID \
 --deploymentIdPassword password \
 --rootUserDN uid=admin \
 --rootUserPassword password \
 --monitorUserPassword password \
 --hostname localhost \
 --adminConnectorPort 4444 \
 --ldapPort 1389 \
 --enableStartTls \
 --ldapsPort 1636 \     
 --httpsPort 8443 \                          
 --replicationPort 8989 \
 --bootstrapReplicationServer localhost:8989 \
 --profile ds-evaluation \
 --start \
 --acceptLicense

Validating parameters..... Done
Configuring certificates..... Done
Configuring server..... Done
Configuring profile DS evaluation................. Done
Starting directory server.................. Done

To see basic server status and configuration, you can launch
/Users/markc/path/to/opendj/bin/status
```

In the DS evaluation profile:

* Babs Jensen's mail is `bjensen@example.com` and password is `hifalutin`.
* Kirsten Vaughan (admin) has mail `kvaughan@example.com` and password `bribery`.
* Generated users are like `user.0@example.com` and their passwords are all `password`.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
