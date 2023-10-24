/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xtw5sqx7",
    "name": "field",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cfh703t0mjspxbr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // remove
  collection.schema.removeField("xtw5sqx7")

  return dao.saveCollection(collection)
})
