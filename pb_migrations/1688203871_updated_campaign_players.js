migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u6whe97662vflh7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usa2n4b0",
    "name": "campaign",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "qnlrhnmrrof1i0e",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwlfcyaw",
    "name": "player",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ilwu9g3",
    "name": "role",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "gm",
        "player"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u6whe97662vflh7")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "usa2n4b0",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xwlfcyaw",
    "name": "player",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3ilwu9g3",
    "name": "role",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "gm",
        "player"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
