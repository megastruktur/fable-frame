/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bh2vw9du",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "gm",
        "public",
        "alert"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bh2vw9du",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "gm",
        "public"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
