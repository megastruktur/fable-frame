migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_DiKPyao` ON `rpg_systems` (`identifier`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2cjytmvw",
    "name": "identifier",
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

  collection.indexes = []

  // remove
  collection.schema.removeField("2cjytmvw")

  return dao.saveCollection(collection)
})
