migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zo1domqi",
    "name": "data",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zo1domqi",
    "name": "data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
