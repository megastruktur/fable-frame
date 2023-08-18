migrate((db) => {
  const collection = new Collection({
    "id": "u6whe97662vflh7",
    "created": "2023-07-01 09:26:22.430Z",
    "updated": "2023-07-01 09:26:22.430Z",
    "name": "campaign_players",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("u6whe97662vflh7");

  return dao.deleteCollection(collection);
})
