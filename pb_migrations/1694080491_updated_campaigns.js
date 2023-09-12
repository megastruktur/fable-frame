migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // remove
  collection.schema.removeField("m1xmez0w")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m1xmez0w",
    "name": "characters",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "cfh703t0mjspxbr",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
