/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // remove
  collection.schema.removeField("cypyjdpr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mdh6x9gs",
    "name": "character",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cfh703t0mjspxbr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z9sbqhlo",
    "name": "message",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cypyjdpr",
    "name": "messages",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("mdh6x9gs")

  // remove
  collection.schema.removeField("z9sbqhlo")

  return dao.saveCollection(collection)
})
