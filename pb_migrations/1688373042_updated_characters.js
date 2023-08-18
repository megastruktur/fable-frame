migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ddcj5p5j",
    "name": "hash",
    "type": "text",
    "required": false,
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
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // remove
  collection.schema.removeField("ddcj5p5j")

  return dao.saveCollection(collection)
})
