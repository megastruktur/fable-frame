/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqz4o3ou",
    "name": "active",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  // remove
  collection.schema.removeField("qqz4o3ou")

  return dao.saveCollection(collection)
})
