migrate((db) => {
  const collection = new Collection({
    "id": "qnlrhnmrrof1i0e",
    "created": "2023-07-01 09:22:08.174Z",
    "updated": "2023-07-01 09:22:08.174Z",
    "name": "campaigns",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "r5xhh0zh",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ezzocmgs",
        "name": "image",
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
      },
      {
        "system": false,
        "id": "cdmfioju",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "w2vapcya",
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
      },
      {
        "system": false,
        "id": "bmcehooo",
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e");

  return dao.deleteCollection(collection);
})
