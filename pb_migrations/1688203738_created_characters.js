migrate((db) => {
  const collection = new Collection({
    "id": "cfh703t0mjspxbr",
    "created": "2023-07-01 09:28:58.271Z",
    "updated": "2023-07-01 09:28:58.271Z",
    "name": "characters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lyvl9wp5",
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
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr");

  return dao.deleteCollection(collection);
})
