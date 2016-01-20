#!/bin/bash

curl -X PUT http://127.0.0.1:5984/exercises/_design/byAgent --data-binary  @./designDocs/exercises.json