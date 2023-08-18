migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oupdsv18nj9d832")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pkcarj2b",
    "name": "text",
    "type": "editor",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oupdsv18nj9d832")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pkcarj2b",
    "name": "text",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
