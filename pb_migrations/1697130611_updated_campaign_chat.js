/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7c1orut6",
    "name": "creator",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // remove
  collection.schema.removeField("7c1orut6")

  return dao.saveCollection(collection)
})
