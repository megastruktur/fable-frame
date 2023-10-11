/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1it0vogo",
    "name": "activeScene",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "dr26359lifz1ycf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // remove
  collection.schema.removeField("1it0vogo")

  return dao.saveCollection(collection)
})
