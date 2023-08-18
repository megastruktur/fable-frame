migrate((db) => {
  const collection = new Collection({
    "id": "shh0f358w4655fm",
    "created": "2023-07-01 09:27:46.239Z",
    "updated": "2023-07-01 09:27:46.239Z",
    "name": "campaign_notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "x0llbtj4",
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
      },
      {
        "system": false,
        "id": "bh2vw9du",
        "name": "type",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "gm",
            "public"
          ]
        }
      },
      {
        "system": false,
        "id": "lscdx72k",
        "name": "note",
        "type": "editor",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "aitknboj",
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
        "id": "undj1lhc",
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
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm");

  return dao.deleteCollection(collection);
})
