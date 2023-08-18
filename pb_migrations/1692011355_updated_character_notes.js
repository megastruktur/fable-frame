migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uu9cutjy",
    "name": "creator",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  // remove
  collection.schema.removeField("uu9cutjy")

  return dao.saveCollection(collection)
})
