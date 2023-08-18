migrate((db) => {
  const collection = new Collection({
    "id": "td18h7zr0u0vqgm",
    "created": "2023-08-14 10:55:23.935Z",
    "updated": "2023-08-14 10:55:23.935Z",
    "name": "character_notes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zo1domqi",
        "name": "data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "orpyysln",
        "name": "character",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "cfh703t0mjspxbr",
          "cascadeDelete": true,
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
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm");

  return dao.deleteCollection(collection);
})
