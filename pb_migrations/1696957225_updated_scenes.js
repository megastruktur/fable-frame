/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dr26359lifz1ycf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kedeamtf",
    "name": "weight",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dr26359lifz1ycf")

  // remove
  collection.schema.removeField("kedeamtf")

  return dao.saveCollection(collection)
})
