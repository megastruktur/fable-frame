migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y0mtivpo",
    "name": "campaign_status",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 2
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // remove
  collection.schema.removeField("y0mtivpo")

  return dao.saveCollection(collection)
})
