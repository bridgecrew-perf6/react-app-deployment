'use strict';
const db = require('@arangodb').db;
const collectionName = 'Part';

if (!db._collection(collectionName)) {
    db._createDocumentCollection(collectionName);
}