migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ztyobbty",
    "name": "hash",
    "type": "text",
    "required": true,
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
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  // remove
  collection.schema.removeField("ztyobbty")

  return dao.saveCollection(collection)
})
