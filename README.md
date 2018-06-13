# Linnia Server

This repository contains a server to query the Linnia Records and search using the Metadata.

Currenlty under construction

## Getting Started

The linnia-server requires a postgres database to connect to. You can either run a server locally, or connect to one that's hosted somewhere else.

To configure the database, ethereum and ipfs connections, you must create a `.env` file in the root of the application and set your environment variables. Here's an example of a sample file:

```
LINNIA_DB_NAME=linnia_db
LINNIA_DB_USERNAME=linnia_user
LINNIA_DB_PASSWORD=securepassword
LINNIA_ETH_PROVIDER=http://localhost:7545
LINNIA_IPFS_HOST=ipfs.infura.io
LINNIA_IPFS_PORT=5001
LINNIA_IPFS_PROTOCOL=https
LINNIA_HUB_ADDRESS=0x3af86b00df7457acd464525f9bb303190c7d5411
```

## End Points

### [GET] /records

#### Receives:

- [string] property [OPTIONAL]
- [address] owner  [OPTIONAL]

Returns all the records in the server with no arguments. The owner argument and the property are for filtering purpose.


### [GET] /users/${address}/permissioned-records

Returns all of the records the user has permission to see.


## Run Server

```
npm install
npm start
```



## Run Tests

```
jasmine-node spec/
```

