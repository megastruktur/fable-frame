migrate((db) => {
  const collection = new Collection({
    "id": "qew4qqb536t1zxd",
    "created": "2023-07-01 09:20:13.966Z",
    "updated": "2023-07-01 09:20:13.966Z",
    "name": "rpg_systems",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cntozbbf",
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
        "id": "xe9l1bvw",
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
        "id": "pcett71w",
        "name": "data",
        "type": "json",
        "required": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "sjiiimlr",
        "name": "status",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd");

  return dao.deleteCollection(collection);
})
