# Linnia Server

This repository contains a server to query the Linnia Records and search using the Metadata.

Currenlty under construction



## End Points

### [GET] /records

Returns all the records in the server



### [GET] /recordsByOwner?owner=[owner_address]

Returns all the records that belongs to that address



### [POST] /records

#### Receives: 

 - [address] owner
 - [string] metadata
 - [byte32] dataHash

Creates a new record in the database. This method is going to be used to get the data that is added to the contracts and keep it associated with the metadata and address in the server. This method does not create a transaction and does not modifies any data in the blockchain.



## Run Server

```
npm install
npm start
```



## Run Tests

```
jasmine-node spec/
```

