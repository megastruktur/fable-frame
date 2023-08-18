migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "azn6ai4k",
    "name": "campaign",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "qnlrhnmrrof1i0e",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jnhbwi8a",
    "name": "avatar",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": [],
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5abbb7kh",
    "name": "data",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dihnsp5o",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  // remove
  collection.schema.removeField("azn6ai4k")

  // remove
  collection.schema.removeField("jnhbwi8a")

  // remove
  collection.schema.removeField("5abbb7kh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dihnsp5o",
    "name": "rpgSystem",
    "type": "relation",
    "required": false,
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
