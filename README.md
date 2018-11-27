# Stow Server

This repository contains a server to query the Stow Records and search using the Metadata.

Currenlty under construction

## Getting Started

The stow-server requires a postgres database to connect to. You can either run a server locally, or connect to one that's hosted somewhere else.

### Setup for postgres

1. `$>createuser stow_user --createdb`
1. `$>createdb stow_db -U stow_user`
1. `$>createdb stow_test_db -U stow_user`

See:https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb

### .env setup

To configure the database, ethereum and ipfs connections, you must create a `.env` file in the root of the application and set your environment variables. Here's an example of a sample file:

```
STOW_DB_NAME=stow_db
STOW_DB_USERNAME=stow_user
STOW_DB_PASSWORD=securepassword
STOW_ETH_PROVIDER=http://localhost:7545
STOW_HUB_ADDRESS=0x3af86b00df7457acd464525f9bb303190c7d5411
STOW_DB_TEST_NAME=stow_test_db
STOW_DB_TEST_USERNAME=stow_user
STOW_DB_TEST_PASSWORD=securepassword

```

## To run tests:

Running integration tests requires the use of a test database. The credentials for so much be configured in the `.env` file like so:

```
STOW_DB_TEST_NAME=stow_test_db
STOW_DB_TEST_USERNAME=stow_user
STOW_DB_TEST_PASSWORD=securepassword
```

You can use the same database as normal, but **be warned, you will lose all of the current data in your database if you run the tests.**

To run the tests, first run the server in test mode like so:

```bash
npm run test-server
```

Then, in a separate terminal window, run the tests like so:

```bash
npm run test
```

## End Points

### [GET] /records/${dataHash}

Returns a single record that matches the dataHash provided in the URI



### [GET] /records

#### Receives:

- [string] property [OPTIONAL]
- [address] owner  [OPTIONAL]

Returns all the records in the server with no arguments. The owner argument and the property are for filtering purpose.



### [GET] /users/${address}/permissions

Returns all of the permissions that belong to the user, both as a viewer and as an owner. Response looks like follows:

```json
{
	"asViewer": [],
	"asOwner": []
}
```


## Run Server

```
npm install
npm start
```
