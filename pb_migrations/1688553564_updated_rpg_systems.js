migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qf9i81rh",
    "name": "image",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qf9i81rh",
    "name": "icon",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
