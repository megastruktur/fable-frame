/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d7qxouet",
    "name": "campaign",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qnlrhnmrrof1i0e",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d7qxouet",
    "name": "campaign",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "qnlrhnmrrof1i0e",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
