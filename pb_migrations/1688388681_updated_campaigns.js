migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2vapcya",
    "name": "rpgSystem",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qew4qqb536t1zxd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "w2vapcya",
    "name": "rpgSystem",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qew4qqb536t1zxd",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
